import { validateAuth } from "../authentication/utils.js";


export const authMiddleware = async (req, res, next) => {
    const tokenCondition = (
        !req.path.startsWith("/api/v1/auth/login") &&
        !req.path.startsWith("/api/v1/user/signup")
    );
    if (tokenCondition) {
        const token = req.headers['access-token'];
        if (!token) {
            const error = new Error('Access-Token is missing in the request headers');
            error.status = 400;
            return next(error);
        }
        const existUser = await validateAuth(token); // Assuming validateAuth returns a response object
        if (!existUser) {
            const error = new Error('Please Log In');
            error.status = 403;
            return next(error);
        };
        // Attach the authenticated user to the request object
        req.user = existUser;
    }
    else {
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
    }

    return next();
};
