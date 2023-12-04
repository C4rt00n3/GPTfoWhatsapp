import { Service } from "../repository";
import { sendMessage, sendImage } from "./functions";
import ChatGPT from "./openIa";
import { PrismaClient } from "@prisma/client";

export interface iResult {
  number: string;
  date_now: Date;
  count_use: number | null;
  name: string;
  image_count: number | null;
}

class ChatBoot {
  private chatGPT = new ChatGPT();
  prisma: PrismaClient;
  service: Service;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.service = new Service(this.prisma);

  }

  calcularIdadeComDiaMes(yyyy: number, mm: number, dd: number) {
    const hoje = new Date();
    const aniversario = new Date(yyyy, mm - 1, dd);

    let idade = hoje.getFullYear() - aniversario.getFullYear();

    // Verifica se o aniversário já ocorreu neste ano
    if (
      hoje.getMonth() < aniversario.getMonth() ||
      (hoje.getMonth() === aniversario.getMonth() &&
        hoje.getDate() < aniversario.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  private async imagine(result: iResult, number: string, input: string, name: string, wamid: string) {
    if (this.service.isSameDay(result.date_now, new Date())) {
      await this.service.mudeCountImage(result)
    }

    if (input.includes("/imagine") && result.image_count! < 3 || number === "557781032674") {
      await this.service.upCountImage(number, name, result.image_count!)
      sendMessage(number, "Criando imagen, aguarde...", wamid);
      const res = await this.chatGPT.chat(
        `crie um titulo pequeno e breve para oque há nesse input: ${input}`,
        number
      );

      const image = await this.chatGPT.imagine(
        input.replace(new RegExp("/imagine", "ig"), ""),
        number,
        wamid
      );

      if (image.data[0].url) {
        await sendImage(number, image.data[0].url, `${res}`, wamid);
        await this.service.upCountImage(number, name, result.image_count!);
      }
      return
    }

    sendMessage(
      number,
      `Peço desculpas, ${name}, mas este projeto destina-se exclusivamente a fins de pesquisa e não é permitido mais de 3 usos diarios do comando '/imagine'. Para qualquer dúvida ou esclarecimento, por favor, entre em contato conosco. Agradecemos sua compreensão`,
      wamid
    );

    return
  }

  private async textGenerate(result: iResult, number: string, input: string, name: string, wamid: string) {
    if (input.length > 200 || number === "557781032674") {
      this.maxText(number, wamid)
      return;
    } else if (result.count_use! < 5 || number === "557781032674") {
      result.count_use! > 1 && sendMessage(number, "gerando texto...");

      const res = await this.chatGPT.chat(input, number, name);
      sendMessage(number, res, wamid);
      return;
    }

    sendMessage(
      number,
      `Peço desculpas, ${name}, mas este projeto destina-se exclusivamente a fins de pesquisa e não é permitido mais de 5 usos diarios. Para qualquer dúvida ou esclarecimento, por favor, entre em contato conosco. Agradecemos sua compreensão.`
    );
    return;
  }

  private async twitterFeture(number: string, input: string, wamid: string) {
    const text = input.replace("/x", "")
    const res = await this.service.findTwitter(text)
    let send: string = "Resposta:\n";

    if (text.length < 5) {
      sendMessage(number, "No minino 5 no name", wamid)
    }

    if (res.length == 0) {
      sendMessage(number, "Não encontramos nada. confira o seu nome.", wamid)
      return
    }

    sendMessage(number, "Gerando texto!")

    for (const [i, element] of res.entries()) {
      console.log(i)
      send += `(name: ${element.ScreenName}, followers: ${element.Followers})`
    }

    sendMessage(number, send, wamid)
  }

  private async devSeach(number: string, wamid: string) {
    const text = `nome: Rafael Felipe, \nidade: ${this.calcularIdadeComDiaMes(
      2004,
      1,
      2
    )},\nlinkedin:https://www.linkedin.com/in/rafael-felipe-3724ab21a/ ,\ngithub: https://github.com/C4rt00n3,\ncurriculo: https://drive.google.com/drive/u/0/my-drive,`;

    sendMessage(number, text, wamid);
    return;
  }

  private maxText(number: string, wamid: string) {
    sendMessage(
      number,
      "Ops seu texto é muito grande!. Só são permitido 200 caracteres.",
      wamid
    );
  }
  public async chatBot(
    number: string,
    name: string,
    input: string,
    wamid: string
  ) {
    const result = await this.service.findOrCreate(number, name);


    if (input.includes("/imagine")) {
      await this.imagine(result, number, input, name, wamid)
      return
    } else if (input.includes("/dev")) {
      await this.devSeach(number, wamid)
      return
    } else if (input.includes("/x")) {
      await this.twitterFeture(number, input, wamid)
      return
    } else if (!input.includes("/x") && !input.includes("/dev") && !input.includes("/imagine")) {
      await this.textGenerate(result, number, input, name, wamid)
      return
    } else {
      sendMessage(
        number,
        `Peço desculpas, ${name}, mas houve um erro. Caso quira nos contatar é só digitar /dev e falar conosco.`
      );
      return;
    }
  }
}

export default ChatBoot;
