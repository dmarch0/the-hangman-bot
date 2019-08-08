const router = require("express").Router();
const client = require("../bot-client");

router.post("/", (req, res, next) => {
  client
    .sendMessage(req.body.message.chat.id, "Hi")
    .promise()
    .then(() => res.json({ ok: true }))
    .catch(next);
});

module.exports = router;

router.get("/", (req, res) => {
  res.json({ ok: "ok" });
});
