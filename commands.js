const createNewGame = require("./funcs").createNewGame;

const availableCommands = {
  test: {
    regex: /^(\/test)(?!\S)/,
    response: (message, gameData) => "Test command"
  },
  new: {
    regex: /^(\/new)(?!\S)/,
    response: (message, gameData) => {
      if (gameData[message.chat.id]) {
        return "Игра все еще идет!";
      }
      gameData[message.chat.id] = createNewGame();
      return `Началась новая игра, загаданное слово: ${gameData[
        message.chat.id
      ].current.join(" ")}`;
    }
  }
};

module.exports = availableCommands;
