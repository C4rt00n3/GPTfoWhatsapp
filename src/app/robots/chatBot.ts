import { Service } from "../repository";
import { sendMessage, sendImage } from "./functions";
import ChatGPT from "./openIa";
import { PrismaClient } from "@prisma/client";

class ChatBoot {
  private chatGPT = new ChatGPT();

  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
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

  public async chatBot(
    number: string,
    name: string,
    input: string,
    wamid: string
  ) {
    if (input.includes("/dev")) {
      const text = `nome: Rafael Felipe, \nidade: ${this.calcularIdadeComDiaMes(
        2004,
        1,
        2
      )},\nlinkedin:https://www.linkedin.com/in/rafael-felipe-3724ab21a/ ,\ngithub: https://github.com/C4rt00n3,\ncurriculo: https://drive.google.com/drive/u/0/my-drive,`;
      sendMessage(number, text, wamid);
    } else {
      const service = new Service(this.prisma);

      const result = await service.findOrCreate(number, name);
      console.log(result.count_use!);
      if (result.count_use! < 11 || number == "557781032674") {
        if (input.includes("/imagine")) {
          sendMessage(number, "Criando imagen, aguarde...", wamid);
          const res = await this.chatGPT.chat(
            `crie um titulo pequeno e breve para oque há nesse input: ${input}`
          );

          const image = await this.chatGPT.imagine(
            input.replace(new RegExp("/imagine", "ig"), "")
          );

          if (image.data[0].url) {
            await sendImage(number, image.data[0].url, `${res}`, wamid);
          }
        } else {
          result.count_use &&
            result.count_use > 1 &&
            sendMessage(number, "gerando texto...");

          const res = await this.chatGPT.chat(
            `O nome de quem está conversando com você é ${name}. Esse é o texto dele: ${input}`
          );
          if (res) {
            sendMessage(number, res, wamid);
          }
        }
      } else {
        sendMessage(
          number,
          `Peço desculpas, ${name}, mas este projeto destina-se exclusivamente a fins de pesquisa e não é permitido mais de 10 usos diarios. Para qualquer dúvida ou esclarecimento, por favor, entre em contato conosco. Agradecemos sua compreensão.`
        );
      }
    }
  }
}

export default ChatBoot;
