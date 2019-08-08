const TelegramBotClient = require("telegram-bot-client");
const key = require("./config/keys").tgToken;

const client = new TelegramBotClient(key);
module.exports = client;
