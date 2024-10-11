module.exports = (sequelize_db, DataTypes) => {
    const TypeOfGame = sequelize_db.define('TypeOfGame', {
        hiragana: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        katakana: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    TypeOfGame.associate = (models) => {
        TypeOfGame.hasMany(models.Game, {
            foreignKey: 'id_type_of_game',
            as: 'games',
            onDelete: 'CASCADE',
        });
    };

    return TypeOfGame;
};
