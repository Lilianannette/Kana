import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hiraganaList from '../assets/data/hiragana.json';
import katakanaList from '../assets/data/katakana.json';
import { level1logic, level2logic, level3logic, level4logic } from '../Services/gameLogic';
import axios from 'axios';

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const GamePage = () => {
    const navigate = useNavigate();

    const [selectedLines, setSelectedLines] = useState({
        hiragana: [],
        katakana: [],
    });

    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentKanaList, setCurrentKanaList] = useState([]);
    const [currentKana, setCurrentKana] = useState(null);
    const [options, setOptions] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [handleAnswer, setHandleAnswer] = useState(null);
    const [isGameReady, setIsGameReady] = useState(false);
    const [lastKana, setLastKana] = useState(null);

    const handleLineSelection = (line, type) => {
        const updatedSelection = selectedLines[type].includes(line)
            ? selectedLines[type].filter(selectedLine => selectedLine !== line)
            : [...selectedLines[type], line];

        setSelectedLines({
            ...selectedLines,
            [type]: updatedSelection,
        });

        setIsGameReady(updatedSelection.length > 0 || selectedLines.hiragana.length > 0);
    };

    const handleStartGame = async () => {
        const selectedKanaLines = [
            ...selectedLines.hiragana.flat(),
            ...selectedLines.katakana.flat(),
        ];

        if (selectedKanaLines.length === 0) {
            console.error('Aucune ligne sélectionnée');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token manquant. Veuillez vous connecter.');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/game', {
                kanaList: selectedKanaLines,
                level: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                const shuffledKanaList = shuffleArray(selectedKanaLines);
                console.log("Liste des kana mélangés :", shuffledKanaList);

                setCurrentKanaList(shuffledKanaList);
                setCurrentKana(shuffledKanaList[0]);
                setCurrentLevel(1);
            }
        } catch (err) {
            console.error('Erreur lors de la création de la partie, Veuillez vous connecter', err);
        }
    };

    useEffect(() => {
      if (currentKana && currentLevel === 1) {
        const { options, handleAnswer } = level1logic(currentKana, currentScore, setCurrentScore, setCurrentLevel, currentKanaList, setCurrentKana, lastKana, setLastKana);
        setOptions(options);
        setHandleAnswer(() => handleAnswer);
      } else if (currentKana && currentLevel === 2) {
        const { options, handleAnswer } = level2logic(currentKana, currentScore, setCurrentScore, setCurrentLevel, setCurrentKana, currentKanaList, lastKana, setLastKana);
        setOptions(options);
        setHandleAnswer(() => handleAnswer);
      } else if (currentKana && currentLevel === 3) {
        const { handleAnswer } = level3logic(currentKana, currentScore, setCurrentScore, setCurrentLevel, currentKanaList, lastKana, setCurrentKana, setLastKana);
        setOptions([]);
        setHandleAnswer(() => handleAnswer);
      } else if (currentKana && currentLevel === 4) {
        const { handleAnswer } = level4logic(currentKanaList, currentScore, setCurrentScore, lastKana);
        setOptions([]);
        setHandleAnswer(() => handleAnswer);
      }
    }, [currentLevel, currentKana, currentScore, currentKanaList, lastKana]);

    const handleNextKana = () => {
        const nextIndex = currentKanaList.indexOf(currentKana) + 1;

        if (nextIndex < currentKanaList.length) {
            setCurrentKana(currentKanaList[nextIndex]);
        } else {
            console.log("Tous les kana ont été utilisés.");
        }
    };

    const handleSubmit = () => {
        if (handleAnswer) {
            if (currentLevel === 1 || currentLevel === 2) {
                handleAnswer(userInput);
            } else if (currentLevel === 3 || currentLevel === 4) {
                const result = handleAnswer(userInput);

                if (result === 'Partie terminée') {
                    navigate('/');
                }
            }

            handleNextKana();
        }
        setUserInput('');
    };

    return (
        <div>
            <h1>Niveau {currentLevel}</h1>

            <h2>Hiragana</h2>
            {hiraganaList.map((line, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                    <input
                        type="checkbox"
                        onChange={() => handleLineSelection(line, 'hiragana')}
                        checked={selectedLines.hiragana.includes(line)}
                    />
                    {line.map((kana, i) => (
                        <span key={kana.char_id} style={{ marginRight: '10px' }}>
                            {kana.romanization} {i < line.length - 1 && ' • '}
                        </span>
                    ))}
                </div>
            ))}

            <h2>Katakana</h2>
            {katakanaList.map((line, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                    <input
                        type="checkbox"
                        onChange={() => handleLineSelection(line, 'katakana')}
                        checked={selectedLines.katakana.includes(line)}
                    />
                    {line.map((kana, i) => (
                        <span key={kana.char_id} style={{ marginRight: '10px' }}>
                            {kana.romanization} {i < line.length - 1 && ' • '}
                        </span>
                    ))}
                </div>
            ))}

            {isGameReady ? (
                <button onClick={handleStartGame}>
                    Commencer le jeu
                </button>
            ) : null}

            <h2>Score: {currentScore}</h2>
            {currentKana && (
                <div>
                    <h3>{currentLevel === 2 ? currentKana.romanization : currentKana.character}</h3>
                    {currentLevel === 3 || currentLevel === 4 ? (
                        <div>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Tapez la réponse en romaji"
                            />
                            <button onClick={handleSubmit}>Valider</button>
                        </div>
                    ) : (
                        <div>
                            {options.map((option, idx) => (
                                <button key={idx} onClick={() => handleAnswer(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


//PROBLEME AU LVL 3 - 4 TOUS LES SYMBOLE UTILISER CONSOLE LOG L110
