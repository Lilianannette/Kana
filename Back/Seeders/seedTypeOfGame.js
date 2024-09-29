const db = require('../Models'); 

async function seedTypesOfGame() {
    try {
        const existingTypes = await db.typeofgame.findAll();
        if (existingTypes.length === 0) {
            await db.typeofgame.bulkCreate([
                { hiragana: true, katakana: false }, 
                { hiragana: false, katakana: true } 
            ]);
            console.log("Types de jeu initialisés");
        } else {
            console.log("Types de jeu déjà présents");
        }
    } catch (err) {
        console.error('Erreur lors de l\'initialisation des types de jeu', err);
    }
}
module.exports = seedTypesOfGame;