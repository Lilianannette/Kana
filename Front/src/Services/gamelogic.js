const generateOptions = (correctKana, kanaList, answerKey) => {
  let options = [correctKana[answerKey]];
  while (options.length < 4) {
    const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    if(!options.includes(randomKana[answerKey])) {
      options.push(randomKana[answerKey]);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

export const level1logic = (kanaList, currentScore, setScore, setLevel) => {
  if(!kanaList || kanaList.length === 0) {
    return {
      question: null,
      options: [],
      handleAnswer: () => {},
    };
  }

  const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
  const options = generateOptions(randomKana, kanaList, 'romanization');

  const handleAnswer = (answer) => {
    if (answer === randomKana.romanization) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }
    if (currentScore + 3 >= 20) {
      setLevel(2);
    }
  };

  return {
    question: randomKana.character,
    options: options,
    handleAnswer: handleAnswer,
  }
};

export const level2logic = (kanaList, currentScore, setScore, setLevel) => {
  const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
  const options = generateOptions(randomKana, kanaList, 'character');

  const handleAnswer = (answer) => {
    if (answer === randomKana.character) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }

    if(currentScore + 3 >= 20) {
      setLevel(3);
    }
  };

  return {
    question: randomKana.romanization,
    options: options,
    handleAnswer: handleAnswer,
  };
};

export const level3logic = (kanaList, currentScore, setScore, setLevel) => {
  const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];

  const handleAnswer = (userInput) => {
    if (userInput.toLowerCase() === randomKana.romanization.toLowerCase()) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }
    if (currentScore + 3 >= 20) {
      setLevel(4);
    }
  };

  return {
    question: randomKana.character,
    handleAnswer: handleAnswer,
  };
};

export const level4logic = (kanaList, currentScore, setScore) => {
  const randomKanaSequence = [];
  for (let i = 0; i < 3; i++) {
    const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    randomKanaSequence.push(randomKana);
  }

  const correctAnswer = randomKanaSequence.map(kana => kana.romanization).join('');

  const handleAnswer = (userInput) => {
    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }
    if (currentScore + 3 >= 20) {
      return 'Partie terminé'
    }
  };

  return {
    question: randomKanaSequence.map(kana => kana.character).join(''),
    handleAnswer: handleAnswer,
  };
};
