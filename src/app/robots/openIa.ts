import OpenAI from "openai";

class ChatGPT {
  private openai = new OpenAI({});

  public async chat(msg: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: msg }],
        model: "gpt-3.5-turbo",
      });
      return completion.choices[0].message.content + "";
    } catch (error) {
      console.error("Erro ao fazer solicitação à API da OpenAI:", error);
      return "Erro ao fazer solicitação à API da OpenAI";
    }
  }

  public async imagine(prompt: string): Promise<OpenAI.Images.ImagesResponse> {
    try {
      const image = await this.openai.images.generate({
        prompt,
        model: "dall-e-3",
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      console.log(image.data);
      return image;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
}
export default ChatGPT;
