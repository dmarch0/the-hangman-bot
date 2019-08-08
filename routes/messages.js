const router = require("express").Router();
const client = require("../bot-client");

router.post("/", (req, res, next) => {
  const messageText = req.body.message.text;
  const commands = req.body.message.entities.filter(
    entitie => entitie.type === "bot_command"
  );
  client
    .sendMessage(
      req.body.message.chat.id,
      `Your message text was ${messageText} and commands were ${commands.toString()}`
    )
    .promise()
    .then(() => res.json({ ok: true }))
    .catch(next);
});

module.exports = router;
