import TwitterX from "./TwitterX";
import { promises as fsPromises } from "fs";

class Format {
  private filePath = './src/data.txt'; // Define o caminho para o arquivo do banco de dados


  public async format(): Promise<TwitterX[]> {
    let data = await fsPromises.readFile(this.filePath, 'utf8');

    const array: Array<string> = data.split("\n");

    const result = array.map(e => {
      return new TwitterX(e.replace(/\s/g, 'null').split(","))
    });


    return result
  }
}

export default Format;
