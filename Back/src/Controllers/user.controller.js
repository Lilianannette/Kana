const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../Models');
const User = db.user;

exports.signup = async (req, res) => {
  try {

    const { gender, pseudo , lastname, firstname, email, password } = req.body;

    const existingUserByPseudo = await User.findOne({ where: { pseudo }});
    if(existingUserByPseudo) {
      return res.status(400).json({ message: 'Ce pseudo est déjà pris.'});
    }

    const existingUserByEmail = await  User.findOne({ where: { email }});
    if(existingUserByEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.'});
    }

    const user = await User.create({
      gender,
      pseudo,
      lastname,
      firstname,
      email,
      password,
    });

    res.status(201).json({ message : 'Utilisateur crée avec succès', user});
  } catch (err) {
    console.error(`Erreur lors de la création de l'utilisateu :`, err);
    res.status(500).json({ message: `Erreur lors de la création de l'utilisateur`});
  }
};

exports.login = async (req, res) => {
  try {
    const { pseudo, password } = req.body

    const user = await User.findOne({ where: { pseudo } });
    if(!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé'});
    }
    console.log('Mot de passe en base:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Correspondance du mot de passe lors de la connexion:', isMatch);
    if(!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorect'});
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h'});

    res.json({ message: 'Connexion réussi', token});
  } catch(err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', err})
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    res.json(user);
  } catch(err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur' });
  }
};


exports.editProfile = async (req, res) => {
  try {
    const { pseudo, lastname, firstname, gender } = req.body;
    const user = await User.findByPk(req.user.id);
    if(!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    user.pseudo = pseudo || user.pseudo;
    user.lastname = lastname || user.lastname;
    user.firstname = firstname || user.firstname;
    user.gender = gender || user.gender;

    await user.save();

    res.json({ message: 'Profil mis à jour avec succès', user });
  } catch(err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', err })
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { include: [ 'pseudo', 'password'] }
    });
    if (!user) {
      return res.status(404).json ({ message: 'Utilisateur non trouvé' })
    }
  
    await user.destroy();
    
    res.json(user);
  } catch(err) {
    res.status(500).json({ message: 'Erreur lors de suppression de votre compte' })
  }
};

exports.logout = async (req, res) => {
  let token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if(!token) {
    return res.status(400).json({ message: 'Token non valide' });
  }

  token = null
  res.status(200).json({ message: 'Déconnexion réussi'})
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if(!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch) {
      return res.status(401).json ({ message: 'Ancien mot de passe Incorrect' });
    }

    if(oldPassword === newPassword) {
      return res.status(400).json({ message: `Le nouveau mot de passe doit être différent de l'ancien`});
      // function needs to be tested
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise a jour du mot de passe', err });
  }
};