import OpenAI from "openai";
import "dotenv/config";
declare class ChatGPT {
    private readonly open_api_key;
    private openai;
    chat(msg: string): Promise<string>;
    imagine(prompt: string): Promise<OpenAI.Images.ImagesResponse>;
}
export default ChatGPT;
