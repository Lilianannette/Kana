const generateOptions = (correctKana, kanaList, answerKey) => {
  if (!correctKana || !kanaList || !correctKana[answerKey] || kanaList.length === 0) {
      console.error('Kana incorrect ou Liste de kana vide.', correctKana, kanaList);
      return [];
  }

  let options = [correctKana[answerKey]];
  while (options.length < 4) {
      const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
      if (randomKana && randomKana[answerKey] && !options.includes(randomKana[answerKey])) {
          options.push(randomKana[answerKey]);
      }
  }
  return options.sort(() => Math.random() - 0.5);
};

export const level1logic = (currentKana, currentScore, setScore, setLevel, kanaList, setCurrentKana, lastKana, setLastKana) => {
  if (!currentKana || !kanaList || kanaList.length === 0 || !currentKana.romanization) {
    console.error("Kana ou Liste de kana incorrecte.", currentKana, kanaList);
    return {
      question: '',
      options: [],
      handleAnswer: () => {},
    };
  }

  const options = generateOptions(currentKana, kanaList, 'romanization');

  const handleAnswer = (answer) => {
    if (answer === currentKana.romanization) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }

    let newKana;
    do {
      newKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    } while (newKana === lastKana);

    setCurrentKana(newKana);
    setLastKana(newKana);

    if (currentScore + 3 >= 20) {
      setScore(0);
      setLevel(2);
    }
  };

  return {
    question: currentKana.character,
    options: options,
    handleAnswer: handleAnswer,
  };
};

export const level2logic = (currentKana, currentScore, setScore, setLevel, setCurrentKana, kanaList, lastKana, setLastKana) => {
  if (!currentKana || !kanaList || kanaList.length === 0 || !currentKana.character) {
    console.error("Kana ou Liste de kana incorrecte.", currentKana, kanaList);
    return {
      question: '',
      options: [],
      handleAnswer: () => {},
    };
  }

  const options = generateOptions(currentKana, kanaList, 'character');

  const handleAnswer = (answer) => {
    if (answer === currentKana.character) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }

    let newKana;
    do {
      newKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    } while (newKana === lastKana);

    setCurrentKana(newKana);
    setLastKana(newKana);

    if (currentScore + 3 >= 20) {
      setScore(0);
      setLevel(3);
    }
  };

  return {
    question: currentKana.romanization,
    options: options,
    handleAnswer: handleAnswer,
  };
};

export const level3logic = (currentKana, currentScore, setScore, setLevel, kanaList, lastKana, setCurrentKana, setLastKana) => {
  if (!currentKana || !currentKana.character || !currentKana.romanization) {
    console.log('Kana incorrect:', currentKana);
    return {
      question: '',
      handleAnswer: () => {},
    };
  }

  const handleAnswer = (userInput) => {
    if (userInput.toLowerCase() === currentKana.romanization.toLowerCase()) {
      setScore((prevScore) => prevScore + 3);
    } else {
      setScore((prevScore) => prevScore - 1);
    }

    let newKana;
    do {
      newKana = kanaList[Math.floor(Math.random() * kanaList.length)];
    } while (newKana === lastKana);

    setCurrentKana(newKana);
    setLastKana(newKana);

    if (currentScore + 3 >= 20) {
      setScore(0);
      setLevel(4);
    }
  };

  return {
    question: currentKana.character,
    handleAnswer: handleAnswer,
  };
};

export const level4logic = (kanaList, currentScore, setScore) => {
  if (!kanaList || kanaList.length === 0) {
      console.error("Liste de kana vide ou incorrecte.");
      return {
          question: '',
          handleAnswer: () => {},
      };
  }

  const randomKanaSequence = [];
  for (let i = 0; i < 3; i++) {
      const randomKana = kanaList[Math.floor(Math.random() * kanaList.length)];
      randomKanaSequence.push(randomKana);
  }

  const correctAnswer = randomKanaSequence.map(kana => kana.romanization).join('');
  console.log('Séquence aléatoire pour le niveau 4:', randomKanaSequence);

  const handleAnswer = (userInput) => {
      if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
          setScore((prevScore) => prevScore + 3);
      } else {
          setScore((prevScore) => prevScore - 1);
      }
      if (currentScore + 3 >= 20) {
          return 'Partie terminée';
      }
  };

  return {
      question: randomKanaSequence.map(kana => kana.character).join(''),
      handleAnswer: handleAnswer,
  };
};
