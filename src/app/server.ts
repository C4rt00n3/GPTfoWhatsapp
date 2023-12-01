import "dotenv/config";
import bodyParser from "body-parser";
import App from "./app";
import ChatBoot from "./robots/chatBot";
import { Service } from "./repository";

class Server extends ChatBoot {
  appInit = new App();
  public routes() {
    this.appInit.app.use(bodyParser.json());
    this.appInit.app.post("/hook", async (req: any, res: any) => {
      const { value } = req?.body?.entry[0]?.changes[0];

      if (value?.messages) {
        const { id, from: destination } = value?.messages[0];
        const message = value?.messages[0]?.text?.body;

        if (message) {
          try {
            await this.chatBot(
              destination,
              value?.contacts[0].profile.name,
              message,
              id
            );
          } catch (error) {
            console.log(error);
          }
        }
      }

      res.status(200).end();
    });

    this.appInit.app.get("/hook", (req, res) => {
      res.send(req.query["hub.challenge"]).status(200).end(); // Responding is important
    });
  }

  public async init() {
    this.routes();

    const service = new Service(this.prisma);
    service.initTwitter()
    this.appInit.app.listen(this.appInit.port, () =>
      console.log(`🚀 Server running on port ${this.appInit.port}`)
    );
  }
}

export default Server;
