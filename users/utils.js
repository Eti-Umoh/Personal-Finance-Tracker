import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import { userSerializer } from "./serializers.js";


export const createUser = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
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
        const saltRounds = 10; // Number of rounds to salt the password (higher is more secure but slower)
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create(
            {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                password: hashPassword,
            });
        const serializedUser = await userSerializer(newUser);
        res.status(201).json({User: serializedUser, message: 'success'});
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
