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
        },

        level: {
          type: DataTypes.ENUM('1', '2', '3', '4'),
          allowNull: false,
          defaultValue: '1',
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
