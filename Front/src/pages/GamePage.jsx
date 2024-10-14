import { useState } from 'react';
import hiraganaList from '../assets/data/hiragana.json';
import katakanaList from '../assets/data/katakana.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GamePage = () => {
    const navigate = useNavigate();

    const [selectedLines, setSelectedLines] = useState({
        hiragana: [],
        katakana: [],
    });

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
          const response = await axios.post('http://localhost:3000/api/game', {
            kanaList: selectedKana,
            level: 1,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if(response.status === 201) {
            navigate('/start', { state: { selectedKana } });
          }
        } catch (err) {
          console.error('Erreur lors de la création de la partie:', err);
        }
    };

    return (
        <div>
            <h1>Choisissez les lignes à pratiquer</h1>

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

            <button
                onClick={handleStartGame}
                disabled={!isGameReady}
            >
                Commencer le jeu
            </button>
        </div>
    );
};
