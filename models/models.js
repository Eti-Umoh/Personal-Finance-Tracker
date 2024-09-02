import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Transaction extends Model {}
Transaction.init({
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: sequelize.NOW,
    },
    txnType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "noDescription",
    },
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


class User extends Model {}
User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


export { Transaction, User };
