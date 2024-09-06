import { User, UserAccessToken } from "../models/models.js";
import bcrypt from "bcrypt";
import { userSerializer } from "./serializers.js";
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "../api_utils.js";


export const createUser = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const password = uuidv4().replace(/-/g, '').slice(0, 8);

    try {
        if (!emailAddress) {
            const error = new Error('emailAddress is missing in the req body');
            error.status = 400;
            return next(error);
        }
        else {
            const existUser = await User.findOne({ where: { emailAddress: emailAddress } });
            if (existUser) {
                const error = new Error('User with that email already exist');
                error.status = 409;
                return next(error);
            }
        }

        const saltRounds = 10; // Number of rounds to salt the password (higher is more secure but slower)
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create(
            {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: hashPassword,
            });
        
        const result = await sendEmail(newUser, password);
        if (result.success) {
            console.log(result.message);
        } else {
            console.error(result.message, result.error);
        }
        const serializedUser = await userSerializer(newUser);
        res.status(201).json({User: serializedUser,
            message: 'Account created and login credentials have been sent to your email'});
    }
    catch (error) {
        next(error);
    }
};


export const getCurrentUser = async (req, res, next) => {
    const currentUser = req.user;
        try {
            const serializedUser = await userSerializer(currentUser);
            res.status(200).json({User: serializedUser, message: 'success'});
        } 
        catch (error) {
            next(error);
        }
};


export const updateUser = async (req, res, next) => {
    const currentUser = req.user;
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const emailAddress = req.body.emailAddress;

        if (currentUser) {
            currentUser.firstName = firstName;
            currentUser.lastName = lastName;
            currentUser.emailAddress = emailAddress;
            currentUser.save();

            const serializedUser = await userSerializer(currentUser)
            res.status(200).json({User: serializedUser, message: 'success'});
        }
    }
    catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    const currentUser = req.user
    try {
        const accessToken = await UserAccessToken.findOne({ where: { userId: currentUser.id } });
        await accessToken.destroy();
        await currentUser.destroy();
        res.status(200).json({message: 'account deleted successfully'});
    } 
    catch (error) {
        next(error);
    }
};
