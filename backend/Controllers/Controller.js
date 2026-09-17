const AuthService = require('../Services/Service');

const signupUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await AuthService.registerUser(userData);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.Username,
                email: newUser.Email
            }
        });

    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode);
        }
        next(error);
    }
};

module.exports = {
    signupUser
};
