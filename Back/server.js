const express = require('express');
const db = require('./src/Models');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' ,
    // origin: 'http://127.0.0.1:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;


const userRoutes = require('./src/Routes/user.route');
const gameRoutes = require('./src/Routes/game.route');

app.use(userRoutes);
app.use(gameRoutes);


db.sequelize_db.sync({alter: true}).then(async() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
