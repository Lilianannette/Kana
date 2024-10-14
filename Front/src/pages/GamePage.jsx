// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import hiraganaList from '../assets/data/hiragana.json';
// import katakanaList from '../assets/data/katakana.json';
// import axios from 'axios';

// export const GamePage = () => {
//     const navigate = useNavigate();

//     const [selectedLines, setSelectedLines] = useState({
//         hiragana: [],
//         katakana: [],
//     });

//     const [isGameReady, setIsGameReady] = useState(false);

//     const handleLineSelection = (line, type) => {
//         const updatedSelection = selectedLines[type].includes(line)
//             ? selectedLines[type].filter(selectedLine => selectedLine !== line)
//             : [...selectedLines[type], line];

//         setSelectedLines({
//             ...selectedLines,
//             [type]: updatedSelection,
//         });

//         setIsGameReady(updatedSelection.length > 0 || selectedLines.hiragana.length > 0);
//     };

//     const handleStartGame = async () => {
//         const selectedKana = [
//             ...selectedLines.hiragana.flat(),
//             ...selectedLines.katakana.flat(),
//         ];

//         try {
//           const response = await axios.post('http://localhost:3000/api/game', {
//             kanaList: selectedKana,
//             level: 1,
//           }, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//           });
//           if(response.status === 201) {
//             navigate('/start', { state: { selectedKana } });
//           }
//         } catch (err) {
//           console.error('Erreur lors de la création de la partie:', err);
//         }
//     };

//     return (
//         <div>
//             <h1>Choisissez les lignes à pratiquer</h1>

//             <h2>Hiragana</h2>
//             {hiraganaList.map((line, idx) => (
//                 <div key={idx} style={{ marginBottom: '10px' }}>
//                     <input
//                         type="checkbox"
//                         onChange={() => handleLineSelection(line, 'hiragana')}
//                         checked={selectedLines.hiragana.includes(line)}
//                     />
//                     {line.map((kana, i) => (
//                         <span key={kana.char_id} style={{ marginRight: '10px' }}>
//                             {kana.romanization} {i < line.length - 1 && ' • '}
//                         </span>
//                     ))}
//                 </div>
//             ))}

//             <h2>Katakana</h2>
//             {katakanaList.map((line, idx) => (
//                 <div key={idx} style={{ marginBottom: '10px' }}>
//                     <input
//                         type="checkbox"
//                         onChange={() => handleLineSelection(line, 'katakana')}
//                         checked={selectedLines.katakana.includes(line)}
//                     />
//                     {line.map((kana, i) => (
//                         <span key={kana.char_id} style={{ marginRight: '10px' }}>
//                             {kana.romanization} {i < line.length - 1 && ' • '}
//                         </span>
//                     ))}
//                 </div>
//             ))}

//             <button
//                 onClick={handleStartGame}
//                 disabled={!isGameReady}
//             >
//                 Commencer le jeu
//             </button>
//         </div>
//     );
// };


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hiraganaList from '../assets/data/hiragana.json';
import katakanaList from '../assets/data/katakana.json';
import { level1logic, level2logic, level3logic, level4logic } from '../Services/gameLogic';
import axios from 'axios';

export const GamePage = () => {
    const navigate = useNavigate();

    const [selectedLines, setSelectedLines] = useState({
        hiragana: [],
        katakana: [],
    });

    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentScore, setCurrentScore] = useState(0);
    const [currentKana, setCurrentKana] = useState(null);
    const [options, setOptions] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [handleAnswer, setHandleAnswer] = useState(null);
    const [isGameReady, setIsGameReady] = useState(false);

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
        const selectedKana = [
            ...selectedLines.hiragana.flat(),
            ...selectedLines.katakana.flat(),
        ];

        try {
          const token = localStorage.getItem('token');

          if (!token) {
            console.error('Token manquant. Veuillez vous connecter.');
            return;
          }

          const response = await axios.post('http://localhost:3000/api/game', {
            kanaList: selectedKana,
            level:1,
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response === 201) {
            setCurrentKana(selectedKana);
            setCurrentLevel(1);
          }
        } catch (err) {
          console.error('Erreur lors de la création de la partie:', err);
        }

        // try {
        //   const response = await axios.post('http://localhost:3000/api/game', {
        //     kanaList: selectedKana,
        //     level: 1,
        //   }, {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        //   });
        //   if (response.status === 201) {
        //     setCurrentKana(selectedKana);
        //     setCurrentLevel(1); // Démarre au niveau 1
        //   }
        // } catch (err) {
        //   console.error('Erreur lors de la création de la partie:', err);
        // }
    };

    useEffect(() => {
        if (currentLevel === 1) {
            const { question, options, handleAnswer } = level1logic(currentKana, currentScore, setCurrentScore, setCurrentLevel);
            setCurrentKana(question);
            setOptions(options);
            setHandleAnswer(() => handleAnswer);
        } else if (currentLevel === 2) {
            const { question, options, handleAnswer } = level2logic(currentKana, currentScore, setCurrentScore, setCurrentLevel);
            setCurrentKana(question);
            setOptions(options);
            setHandleAnswer(() => handleAnswer);
        } else if (currentLevel === 3) {
            const { question, handleAnswer } = level3logic(currentKana, currentScore, setCurrentScore, setCurrentLevel);
            setCurrentKana(question);
            setOptions([]);
            setHandleAnswer(() => handleAnswer);
        } else if (currentLevel === 4) {
            const { question, handleAnswer } = level4logic(currentKana, currentScore, setCurrentScore);
            setCurrentKana(question);
            setOptions([]);
            setHandleAnswer(() => handleAnswer);
        }
    }, [currentLevel, currentKana, currentScore]);

    const handleSubmit = () => {
        if (handleAnswer) {
            if (currentLevel === 1 || currentLevel === 2) {
                handleAnswer(userInput);
            } else if (currentLevel === 3 || currentLevel === 4) {
                const result = handleAnswer(userInput);

                if (result === 'Partie terminé') {
                    navigate('/');
                }
            }
        }
        setUserInput('');
    };

    return (
        <div>
            <h1>Niveau {currentLevel}</h1>
            <h2>Score: {currentScore}</h2>

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

            {currentKana && (
                <div>
                    <h3>{currentKana}</h3> 
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
