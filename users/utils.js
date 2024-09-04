import { User } from "../models/models.js";
import bcrypt from "bcrypt";


export const createUser = async (req, res, next) => {
    const secret = req.headers.secretKey;
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
        res.status(201).json({message: 'success', User: newUser});
    } catch (error) {
        next(error);
    }
};
