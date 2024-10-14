const db = require('../Models');
const Game = db.game;

exports.createGame = async (req, res) => {
  try {
    const { level, kanaList } = req.body;

    if(!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié'});
    }
    const newGame = await Game.create({
      id_user: req.user.id,
      level,
      status: 'in_progress',
      finishedAt: null,
    });

    res.status(201).json({ message: 'Partie créée avec succès', game: newGame});
  } catch (err) {
    console.error('Erreur lors de la création de la partie:', err);
    res.status(500).json({ message: 'Erreur lors de la création de la partie'});
  }
};

exports.getGamesByUser = async (req, res) => {
  try {
    if(!req.user.id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié'});
    }

    const game = await Game.findAll({
      where: { id_user: req.user.id },
      include: [{ model: TypeOfGame, as: 'typeOfGame '}],
    });

    if(game.lenght === 0) {
      return res.status(404).json({ message: 'Aucune partie trouvée pour cet utilisateur'});
    }

    const inProgressGame = game.filter(game => game.status === 'in_progress');
    const finishedGame = game.filter(game => game.status === 'finished');
    const notFinishiedGame = game.filter(game => game.status === 'not_finished');

    res.json({
      inProgressGame,
      finishedGame,
      notFinishiedGame
    });
  } catch(err) {
    console.error('Erreur lors de la récupération des parties :', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des parties'});
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const gameId = res.params.id;

    const game = await Game.findByPk(gameId);
    if(!game) {
      return res.status(401).json({ message: 'Partie non trouvé'});
    }

    await game.destroy();

    res.json({ message: 'Partie supprimé avec succès'});
  } catch (err) {
    console.error('Erreur lors de la suppression de la partie :', err);
    res.status(500).json({ message: 'Erreur lors de la suppression de la partie'});
  }
};
