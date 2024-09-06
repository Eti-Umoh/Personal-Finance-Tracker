import {  User, UserAccessToken } from "../models/models.js";
import bcrypt from 'bcrypt';
import { userSerializer } from "../users/serializers.js";


const generateToken = async (length = 32) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
};


const generateUserAccessToken = async (existUser) => {
    const userId = existUser.id;
    const accessToken = await UserAccessToken.findOne({ where: { userId: userId } });

    if (!accessToken) {
        const token = await generateToken();
        const newUserAccessToken = await UserAccessToken.create(
            {
                token: token,
                userId: userId,
            });
        return newUserAccessToken;
    }
    else {
        if (new Date() > accessToken.expiresAt) { // Token has expired
            const token = await generateToken(); // Generate a new token
            accessToken.token = token;
            accessToken.expiresAt = new Date(new Date().getTime() + 120 * 60 * 1000);
            await accessToken.save(); // Update the token
            return accessToken;
        } else {
            return accessToken;
        }
    }
};


const authenticateUser = async (emailAddress, password) => {
    const existUser = await User.findOne({ where: { emailAddress: emailAddress } });

    if (existUser && await bcrypt.compare(password, existUser.password)) {
        return existUser;
    } else {
        return null;
    }
};


export const login = async (req, res, next) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    if (!req.body.emailAddress) {
        const error = new Error('emailAddress is missing in the req body');
        error.status = 400;
        return next(error);
    }
    else if (!req.body.password) {
        const error = new Error('password is missing in the req body');
        error.status = 400;
        return next(error);
    }

    try {
        const existUser = await authenticateUser(emailAddress, password);
        if (!existUser) {
            const error = new Error('Incorrect Password or Email');
            error.status = 404;
            return next(error);
        }

        const accessToken = await generateUserAccessToken(existUser)
        if (!accessToken) {
            const error = new Error('Error generating access token');
            error.status = 400;
            return next(error);
        }

        const serializedUser = await userSerializer(existUser);
        res.status(200).json({User: serializedUser, accessToken: accessToken.token,
            message: 'success'});

    } catch (error) {
        next(error);
    }
};


export const validateAuth = async (token) => {
        const accessToken = await UserAccessToken.findOne({ where: { token: token } });
        if (accessToken) {
            if (accessToken.expiresAt > new Date()) {
                const userId = accessToken.userId
                const existUser = await User.findByPk(userId);
                if (existUser) {
                    accessToken.expiresAt = new Date(new Date().getTime() + 120 * 60 * 1000);
                    await accessToken.save();
                    return existUser;
                }
            }
        }
        return null
    };


export const logOut = async (req, res, next) => {
    const currentUserId = req.user.id;
    try {
        const accessToken = await UserAccessToken.findOne({ where: { userId: currentUserId } });
        await accessToken.destroy();
        res.status(200).json({message: 'logged out'});
    }
    catch (error) {
        next(error);
    }
};


export const changePassword = async (req, res, next) => {
    const currentUser = req.user;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    try {
        if (await bcrypt.compare(password, currentUser.password)) {
            const saltRounds = 10; // Number of rounds to salt the password (higher is more secure but slower)
            const hashPassword = await bcrypt.hash(newPassword, saltRounds);
            currentUser.password = hashPassword;
            currentUser.save();
        }
        else {
            const error = new Error('Incorrect Current password');
            error.status = 403;
            return next(error);
        }
        res.status(200).json({message: 'successfully changed password'});
    }
    catch (error) {
        next(error);
    }
};
