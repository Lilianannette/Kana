const bcrypt = require('bcrypt');

module.exports = (sequelize_db, DataTypes) => {
    const User = sequelize_db.define('User', {

        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other'),
            allowNull: false,
            defaultValue: 'Other',
        },

        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if(user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if(user.changed('password')) {
                    if(!user.password.startsWith('$2b$')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                }
            }
        },
        instanceMethods: {
            validPassword: async function(password) {
                return await bcrypt.compare(password, this.password);
            }
        }
    });

    User.associate = (models) => {
        User.hasmany(models.game, {
            foreignkey: 'id_user',
            as: 'games',
            onDelete: 'CASCADE',
        });
    };

    return User;
};