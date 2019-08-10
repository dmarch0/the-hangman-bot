const words = require("./words");
const gallows = require("./gallows");

const extractTextFromCommand = messageText => {
  return messageText.split(" ")[1];
};

const createNewGame = () => {
  const word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  const current = [];
  for (let i = 0; i < word.length; i++) {
    current.push("_");
  }
  return {
    word,
    wordByLetters: word.split(""),
    current,
    alreadyGuessedLetters: [],
    mistakes: 0
  };
};

const gameProcess = (message, gameData) => {
  if (!gameData[message.chat.id]) {
    return "Игра еще не началась, воспользуйтесь командой new, чтобы начать игру";
  }
  const dataEntry = gameData[message.chat.id];
  const letter = message.text.toUpperCase();
  //Если в тексте сообщения больше, чем одна буква после команды
  if (letter.length === 0) {
    return "";
  }
  if (letter.length > 1) {
    return "Вы должны написать только одну букву";
  }
  //Если буква не кириллица
  if (!/[\u0400-\u04FF]/i.test(letter)) {
    return "Это должна быть русская буква!";
  }
  if (dataEntry.alreadyGuessedLetters.includes(letter)) {
    //Если буква уже была, то сообщить об этом
    return `Эта буква уже была!\n Другие буквы, которые уже были:\n${dataEntry.alreadyGuessedLetters.join(
      ", "
    )}`;
  } else {
    //Добавить букву в те, что уже были
    dataEntry.alreadyGuessedLetters.push(letter);
    //Проверить все буквы, если такие есть, то добавить индексы букв для замещения
    //Если нет, то это ошибка, нужно увеличить mistakes и вывести картинку виселицы и текущее слово
    //Если mistakes === 10, игра окончена
    const indicesToAddLetter = [];
    dataEntry.wordByLetters.map((resultLetter, index) => {
      if (resultLetter === letter) {
        indicesToAddLetter.push(index);
      }
    });
    if (indicesToAddLetter.length === 0) {
      dataEntry.mistakes += 1;
      if (dataEntry.mistakes >= 10) {
        delete gameData[message.chat.id];
        return `Игра окончена, вы проиграли!\n${gallows[9]}`;
      } else {
        return `Такой буквы нет!\n ${
          gallows[dataEntry.mistakes - 1]
        }\n Осталось жизней: ${10 -
          dataEntry.mistakes}, текущее слово:\n ${dataEntry.current.join(" ")}`;
      }
    } else {
      for (let indice of indicesToAddLetter) {
        dataEntry.current[indice] = letter;
      }
      if (dataEntry.current.join("") === dataEntry.word) {
        const word = dataEntry.word;
        delete gameData[message.chat.id];
        return `Вы победили!, загаданное слово было ${word}`;
      } else {
        return `Такая буква есть, текущее слово:\n ${dataEntry.current.join(
          " "
        )}\n Буквы, которые уже были: ${dataEntry.alreadyGuessedLetters.join(
          ", "
        )}`;
      }
    }
  }
};

module.exports = { extractTextFromCommand, createNewGame, gameProcess };
