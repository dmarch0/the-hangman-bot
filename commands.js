const extractTextFromCommand = require("./utils").extractTextFromCommand;
const createNewGame = require("./utils").createNewGame;

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
  },
  try: {
    regex: /^(\/try)(?!\S)/,
    response: (message, gameData) => {
      if (!gameData[message.chat.id]) {
        return "Игра еще не началась, воспользуйтесь командой new, чтобы начать игру";
      }
      const letter = message.text.toUpperCase();
      //Если в тексте сообщения больше, чем одна буква после команды
      if (letter.length === 0) {
        return "";
      }
      if (letter.length > 1) {
        return "Вы должны написать только одну букву";
      }
      //Если буква уже была, то сообщить об этом
      if (gameData[message.chat.id].alreadyGuessedLetters.includes(letter)) {
        return "Эта буква уже была!";
      } else {
        //Добавить букву в те, что уже были
        gameData[message.chat.id].alreadyGuessedLetters.push(letter);
        //Проверить все буквы, если такие есть, то добавить индексы букв для замещения
        //Если нет, то это ошибка, нужно увеличить mistakes и вывести картинку виселицы и текущее слово
        //Если mistakes === 10, игра окончена
        const indicesToAddLetter = [];
        gameData[message.chat.id].wordByLetters.map((resultLetter, index) => {
          if (resultLetter === letter) {
            indicesToAddLetter.push(index);
          }
        });
        if (indicesToAddLetter.length === 0) {
          gameData[message.chat.id].mistakes += 1;
          if (gameData[message.chat.id].mistakes >= 10) {
            delete gameData[message.chat.id];
            return "Игра окончена, вы проиграли!";
          } else {
            return `Такой буквы нет, *картинка виселицы*, ошибок ${
              gameData[message.chat.id].mistakes
            }, текущее слово ${gameData[message.chat.id].current.join(" ")}`;
          }
        } else {
          for (let indice of indicesToAddLetter) {
            gameData[message.chat.id].current[indice] = letter;
          }
          if (
            gameData[message.chat.id].current.join("") ===
            gameData[message.chat.id].word
          ) {
            const word = gameData[message.chat.id].word;
            delete gameData[message.chat.id];
            return `Вы победили!, загаданное слово было ${word}`;
          } else {
            return `Такая буква есть, текущее слово: ${gameData[
              message.chat.id
            ].current.join(" ")}`;
          }
        }
      }
    }
  }
};

module.exports = availableCommands;
