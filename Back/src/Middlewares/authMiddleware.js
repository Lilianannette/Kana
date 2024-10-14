// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//     if(token) {
//         jwt.verify(token, 'secretKey', (err, user) => {
//             if(err) {
//                 return res.sendStatus(403);
//             }
//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };

// module.exports = authenticateJWT;

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization; // Récupère l'en-tête Authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Récupère le token après "Bearer"

        jwt.verify(token, 'secretKey', (err, user) => {
            if (err) {
                // Si l'erreur est liée à l'expiration du token ou autre, envoie une réponse plus explicite
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Le token a expiré. Veuillez vous reconnecter.' });
                }
                return res.status(403).json({ message: 'Token invalide.' }); // Token invalide
            }

            // Si tout est bon, on stocke l'utilisateur dans req.user pour une utilisation ultérieure
            req.user = user;
            next(); // Passe au middleware ou au contrôleur suivant
        });
    } else {
        // Si pas d'en-tête Authorization, envoie un message 401 Unauthorized
        return res.status(401).json({ message: 'Token manquant. Veuillez vous authentifier.' });
    }
};

module.exports = authenticateJWT;

