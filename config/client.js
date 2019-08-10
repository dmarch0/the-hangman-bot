const TelegramBotClient = require("telegram-bot-client");
const key = require("./keys").tgToken;

const client = new TelegramBotClient(key);
module.exports = client;
