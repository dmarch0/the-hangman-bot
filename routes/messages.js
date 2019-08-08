const router = require("express").Router();
const client = require("../bot-client");
const availableCommands = require("../commands");
const gameProcess = require("../funcs").gameProcess;

const gameData = {};

router.post("/", (req, res, next) => {
  //commented code line to wash down the drain pipe pending errors in case errors overflow
  return res.status(200).json({ ok: true });
  const messageText = req.body.message.text;
  let response;
  //Если сообщение - команда, то ответить на команду
  for (let commandKey in availableCommands) {
    const command = availableCommands[commandKey];
    if (command.regex.test(messageText)) {
      response = command.response(req.body.message, gameData);
    }
  }
  //Если сообщение не команда, то считать, что идет игра
  if (!response) {
    response = gameProcess(req.body.message, gameData);
  }

  if (response) {
    client
      .sendMessage(req.body.message.chat.id, response)
      .promise()
      .then(() => res.json({ ok: true }))
      .catch(next);
  } else {
    return res.status(200).json({ ok: true });
  }
});

module.exports = router;
