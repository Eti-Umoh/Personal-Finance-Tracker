import {  User, UserAccessToken } from "../models/models.js";
import bcrypt from 'bcrypt';


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
        console.log(token)
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
    const secret = req.headers['secretkey'];
    if (!secret) {
        const error = new Error('Secret is missing in the request headers');
        error.status = 400;
        return next(error);
    }
    else if (secret !== process.env.SECRET_KEY) {
        const error = new Error('Invalid Secret specified in the request headers');
        error.status = 400;
        return next(error);
    }

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

        res.status(200).json({'User': existUser, 'accessToken': accessToken.token,
            'message': 'success'});

    } catch (error) {
        next(error);
    }
};
