const router = require("express").Router();
const client = require("../bot-client");
const availableCommands = require("../commands");

const gameData = {};

router.post("/", (req, res, next) => {
  //commented code line to wash down the drain pipe in case too many errors
  //return res.status(200).json({ ok: true });
  const messageText = req.body.message.text;
  let response = "Помогите, я ничего не понимаю!";
  if (gameData[req.body.message.chat.id]) {
    response = availableCommands.try.response(req.body.message, gameData);
  } else {
    for (let commandKey in availableCommands) {
      const command = availableCommands[commandKey];
      if (command.regex.test(messageText)) {
        response = command.response(req.body.message, gameData);
      }
    }
  }

  client
    .sendMessage(req.body.message.chat.id, response)
    .promise()
    .then(() => res.json({ ok: true }))
    .catch(next);
});

module.exports = router;
