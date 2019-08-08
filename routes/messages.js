const router = require("express").Router();
const client = require("../bot-client");
const availableCommands = require("../commands");

const gameData = {};

router.post("/", (req, res, next) => {
  const messageText = req.body.message.text;
  let response;
  for (let commandKey in availableCommands) {
    const command = availableCommands[commandKey];
    if (command.regex.test(messageText)) {
      response = command.response(req.body.message, gameData);
    }
  }
  client
    .sendMessage(req.body.message.chat.id, response)
    .promise()
    .then(() => res.json({ ok: true }))
    .catch(next);
});

module.exports = router;
