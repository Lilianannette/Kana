const db = require('../Models');
const Game = db.game;

exports.createGame = async (req, res) => {
    try {
        const { id_type_of_game } = req.body;
        const userId = req.user.id;

        const game = await Game.create({
            id_user: userId,
            id_type_of_game,
        });

        res.status(201).json({ message: 'Partis créée avec succès', game });
    }   catch(err) {
        res.status(500).json({ message: 'Erreur lors de la création de la partie', err });
    }
};

exports.getUserGames = async (req, res) => {
    try {
        const userId = req.user.id;

        const games = await Game.findAll({
            where: { id_user: userId },
            include: {
                model: db.typeofgame,
                as: 'typeOfGame',
                attributes: ['hiragana', 'katakana'],
            }
        });

        res.status(200).json(games);
    }   catch(err) {
        res.status(500).json({ message: 'Erreur lors de la récuperration des parties', err });
    }
}

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id, {
            include: {
                model: db.typeofgame,
                as: 'typeOfGame',
                attributes: ['hiragana', 'katakana'],
            }
        });

        if(!game) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        res.status(200).json(game);
    }   catch(err) {
        res.status(500).json({ message: 'Erreur lors de la récupérations de la partie', err })
    }
};

exports.updateGame = async (req, res) => {
    try {
        const { finishedAt } = req.body;
        const game = await Game.findByPk(req.params.id);

        if(!game) {
            return res.status(404).json({ message: 'Partis non trouvée' });
        }

        game.finishedAt = finishedAt || new Date();

        await game.save()
        res.status(200).json({ message: 'Partie mise à jour avec succès', game });
    }   catch(err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la partie', err });
    }
};