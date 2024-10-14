const generateOptions = (correctKana, kanaList, answerKey) => {
  let options = [correctKana[answerKey]];
  while (options.lenght < 4) {
    const randomKana = kanaList[Math.floor(Math.random() * kanaList.lenght)];
    if(!options.includes(randomKana[answerKey])) {
      options.push(randomKana[answerKey]);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

export const level1logic = (kanaList, currentScore, setScore, setLevel) => {
  const randomKana = kanaList[Math.floor(Math.random() * kanaList.lenght)];

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
  const randomKana = kanaList[Math.floor(Math.random() * kanaList.lenght)];
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
  }
}
