module.exports = (sequelize_db, DataTypes) => {
    const Game = sequelize_db.define('game', {
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    });

    Game.associate = (models) => {
        game.belongsTo(models.user, {
            foreignKey: 'id_user',
            as: 'user',
            onDelete: 'CASCADE',
        });

        game.belongsTo(models.TypeOfGame,  {
            foreignKey: 'id_type_of_game',
            as: 'typeOfGame',
            onDelete: 'CASCADE',
        });
    };

    return Game;
}