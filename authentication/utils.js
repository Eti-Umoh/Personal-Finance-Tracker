const generateUserAccessToken = () => {
    try {
        const existUser = await User.();
        res.status(201).json(existUser);
    } catch (error) {
        next(error);
    }

};

const authenticateUser = (emailAddress, password) => {
    if (emailAddress) {
        const existUser = await User.();
        return existUser;
    }

};

const login = (req, res, next) => {
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

        res.status(201).json({'User': `${newUser}`, 'accessToken': `${accessToken}`,
            'message': 'success'});

    } catch (error) {
        next(error);
    }

};
