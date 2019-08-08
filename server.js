//middleware and app
const bodyParser = require("body-parser");
const app = require("express")();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get configed client
const client = require("./bot-client");

//routes
const messages = require("./routes/messages");

//generate random webhook token
const randomstring = require("randomstring");
const webhookToken = randomstring.generate(16);

const port = require("./config/port");

//connect ngrok redirect url
const ngrok = require("ngrok");
const axios = require("axios");
const key = require("./config/keys").tgToken;
(async () => {
  const url = await ngrok.connect(port);
  console.log(`ngrok connected at ${url}`);
  console.log(`webhook token is ${webhookToken}`);
  //   const res = await axios.post(`https://api.telegram.org/bot${key}/setWebhook`);
  //   console.log(res);
  app.use(`/${webhookToken}`, messages);
  app.listen(port, () => console.log(`server listening on port ${port}`));
})();
