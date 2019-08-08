const router = require("express").Router();
const client = require("../bot-client");

const availableCommands = {
  test: {
    regex: /^(\/test)/,
    response: () => "command was test"
  },
  new: {
    regex: /^(\/new)/,
    response: () => "command was new"
  }
};

router.post("/", (req, res, next) => {
  const messageText = req.body.message.text;
  let messageCommand = "no command";
  for (let commandKey in availableCommands) {
    const command = availableCommands[commandKey];
    if (command.regex.test(messageText)) {
      messageCommand = command.response();
    }
  }
  client
    .sendMessage(
      req.body.message.chat.id,
      `Your message text was ${messageText} and command was ${messageCommand}`
    )
    .promise()
    .then(() => res.json({ ok: true }))
    .catch(next);
});

module.exports = router;
