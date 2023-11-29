import "dotenv/config";
import App from "./app";
import ChatBoot from "./robots/chatBot";
declare class Server extends ChatBoot {
    appInit: App;
    routes(): void;
    init(): void;
}
export default Server;
