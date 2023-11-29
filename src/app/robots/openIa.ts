import OpenAI from "openai";
import "dotenv/config";

class ChatGPT {
  private readonly open_api_key = process.env?.OPENAI_API_KEY;

  private openai = new OpenAI({
    apiKey: this.open_api_key ? this.open_api_key.toString() : "",
    // "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"
  });

  public async chat(msg: string, name?: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `O nome de quem está conversando com você é ${name}`,
          },
          { role: "user", content: msg },
        ],
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
        model: "dall-e-2",
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      return image;
    } catch (error: any) {
      console.log(error);
      return error;
    }
  }
}
export default ChatGPT;
