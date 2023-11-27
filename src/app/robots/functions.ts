import axios from "axios";
import "dotenv/config";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.WA_TOKEN}`,
  },
};

interface iPostData {
  messaging_product: string;
  to: string;
  type: string;
  text: {
    body: string;
  };
  context?: { message_id?: string }; // Adiciona context ao tipo
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const gprint = (number: string, message: string, wmaid?: string) => {
  let text = "";
  for (let i = 0; i < 100; i++) {
    text += "=";
  }

  console.log(text);
  console.log(number, message, wmaid);
  console.log(text);
};

const sendMessage = async (number: string, message: string, wmaid?: string) => {
  gprint(number, message, wmaid);

  const context = {
    message_id: wmaid,
  };

  const postData: iPostData = {
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      body: message,
    },
  };

  // Adiciona o contexto se wmaid existir
  if (wmaid) {
    postData.context = context;
  }

  axios
    .post(
      `https://graph.facebook.com/v14.0/${process.env.WAID}/messages`,
      postData,
      axiosConfig
    )
    .then(function (response) {
      console.log("É ela", response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const sendImage = async (
  number: string,
  link: string,
  caption: string,
  wmaid: string
) => {
  axios
    .post(
      `https://graph.facebook.com/v14.0/${process.env.WAID}/messages`,
      {
        messaging_product: "whatsapp",
        context: {
          message_id: wmaid,
        },
        to: number,
        type: "image",
        image: {
          link: link,
          caption: caption,
        },
      },
      axiosConfig
    )

    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const sendDevContact = async (number: string, wmaid: string) => {
  axios
    .post(
      `https://graph.facebook.com/v14.0/${process.env.WAID}/messages`,
      {
        messaging_product: "whatsapp",
        context: {
          message_id: wmaid,
        },
        to: number,
        type: "contacts",
        contacts: [
          {
            birthday: "2006-04-14",
            emails: [
              {
                email: "jeffersunde72@gmail.com",
                type: "WORK",
              },
            ],
            name: {
              first_name: "Jeffer",
              formatted_name: "Jeffer Marcelino",
              last_name: "Sunde",
            },
            org: {
              company: "CEG Microsystems",
              department: "Tech",
              title: "Developer",
            },
            phones: [
              {
                phone: "+258 84 399 7730",
                type: "WORK",
                wa_id: "258843997730",
              },
              {
                phone: "+258 87 012 6103",
                type: "HOME",
              },
            ],
            urls: [
              {
                url: "https://github.com/JefferMarcelino",
                type: "WORK",
              },
            ],
          },
        ],
      },
      axiosConfig
    )

    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const removeCommand = (command: string, text: string) => {
  const slipted = text.split(" ");
  let params = "";
  slipted.forEach((item) => {
    if (item.toLowerCase() !== command) {
      params += ` ${item}`;
    }
  });
  return params.trim();
};

const generateRandomInteger = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
};

export {
  sendMessage,
  sendImage,
  sendDevContact,
  removeCommand,
  toTitleCase,
  generateRandomInteger,
};
