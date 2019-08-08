const router = require("express").Router();
const client = require("../bot-client");

const availableCommands = [/^(\/test)/, /^(\/new)/];

router.post("/", (req, res, next) => {
  const messageText = req.body.message.text;
  const messageCommand = "";
  for (let command of availableCommands) {
    messageCommand += messageText.match(command)[0];
  }
  if (messageCommand) {
    client
      .sendMessage(
        req.body.message.chat.id,
        `Your message text was ${messageText} and command was ${messageCommand}`
      )
      .promise()
      .then(() => res.json({ ok: true }))
      .catch(next);
  } else {
    client
      .sendMessage(req.body.message.chat.id, `No command found`)
      .promise()
      .then(() => res.json({ ok: true }))
      .catch(next);
  }
});

module.exports = router;
