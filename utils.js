const extractTextFromCommand = messageText => {
  return messageText.split(" ")[1];
};

const createNewGame = () => ({
  word: "НАЧАЛЬНИК",
  wordByLetters: ["Н", "А", "Ч", "А", "Л", "Ь", "Н", "И", "К"],
  current: ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
  alreadyGuessedLetters: [],
  mistakes: 0
});

module.exports = { extractTextFromCommand, createNewGame };
