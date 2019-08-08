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

(async () => {
  const url = await ngrok.connect(port);
  console.log(`ngrok connected at ${url}`);
  console.log(`webhook token is ${webhookToken}`);
  client.setWebhook(process.env.BASE_URL + "/" + webhookToken);
  app.use(`/${webhookToken}`, messages);
  app.listen(port, () => console.log(`server listening on port ${port}`));
})();
