import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';


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
    userId: { // Foreign key for User
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id',      // 'id' refers to column name in users table
        }
    },
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


class UserAccessToken extends Model {}
UserAccessToken.init({
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: { // Foreign key for User
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id',      // 'id' refers to column name in users table
        }
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW() + INTERVAL '120 MINUTES'"),
    },
}, {
    sequelize,
    modelName: 'UserAccessToken',
    tableName: 'userAccessTokens',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


class UserPasswordResetToken extends Model {}
UserPasswordResetToken.init({
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: { // Foreign key for User
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id',      // 'id' refers to column name in users table
        }
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW() + INTERVAL '15 MINUTES'"),
    },
}, {
    sequelize,
    modelName: 'UserPasswordResetToken',
    tableName: 'userPasswordResetTokens',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


// A transaction belongs to a user
Transaction.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner', // Optional: alias for the association
});

// A user can have many transactions
User.hasMany(Transaction, {
    foreignKey: 'userId',
    as: 'transactions', // Optional: alias for the association
});

// An access token belongs to a user
UserAccessToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner', // Optional: alias for the association
});

// A user can have one access token
User.hasOne(UserAccessToken, {
    foreignKey: 'userId',
    as: 'userAccessTokens', // Optional: alias for the association
});

// A reset token belongs to a user
UserPasswordResetToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner', // Optional: alias for the association
});

// A user can have one reset token
User.hasOne(UserPasswordResetToken, {
    foreignKey: 'userId',
    as: 'userPasswordResetTokens', // Optional: alias for the association
});

export { Transaction, User, UserAccessToken, UserPasswordResetToken};
