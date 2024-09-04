const authMiddleware = async (req, res, next) => {
    const tokenCondition = (
        !req.path.startsWith("/api/v1/auth/login") &&
        !req.path.startsWith("/api/v1/user/signup")
    );
    if (tokenCondition) {
        const token = req.headers['access-token'];
        const { response, isValid } = await validateAuth(token, domain); // Assuming validateAuth returns a response object and a boolean
        if (!isValid) {
            return res.status(403).json({ detail: response });
        }
    }

    return next();
};