import { UserAccessToken, User } from "../models/models";


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
    const accessToken = UserAccessToken.findOne({ where: { userId: userId } });

    if (!accessToken) {
        const token = generateToken();
        const newUserAccessToken = await UserAccessToken.create(
            {
                token: token,
                userId: userId,
            });
        return newUserAccessToken;
    }
    else {
        if (new Date() > accessToken.expiresAt) { // Token has expired
            const token = generateToken(); // Generate a new token
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
        const existUser = authenticateUser(emailAddress, password);
        if (!existUser) {
            const error = new Error('Incorrect Password or Email');
            error.status = 404;
            return next(error);
        }

        const accessToken = generateUserAccessToken(existUser)
        if (!accessToken) {
            const error = new Error('Error generating access token');
            error.status = 400;
            return next(error);
        }

        res.status(201).json({'User': `${existUser}`, 'accessToken': `${accessToken}`,
            'message': 'success'});

    } catch (error) {
        next(error);
    }
};
