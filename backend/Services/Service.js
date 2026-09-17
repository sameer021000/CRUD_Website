const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const { validateSignupData } = require('../Validations/Validation');

const registerUser = async (userData) => {
    // 1. Validation
    const validation = validateSignupData(userData);
    if (!validation.isValid) {
        const error = new Error(validation.message);
        error.statusCode = 400;
        throw error;
    }

    const { FirstName, LastName, Email, Phone, Username, Password } = userData;

    // 2. Uniqueness Checks
    const existingEmail = await User.findOne({ Email: Email.toLowerCase() });
    if (existingEmail) {
        const error = new Error('This email is already registered');
        error.statusCode = 409;
        throw error;
    }

    const existingUsername = await User.findOne({ Username });
    if (existingUsername) {
        const error = new Error('This username is already taken');
        error.statusCode = 409;
        throw error;
    }

    const existingPhone = await User.findOne({ Phone });
    if (existingPhone) {
        const error = new Error('This phone number is already registered');
        error.statusCode = 409;
        throw error;
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // 4. Save User
    const newUser = await User.create({
        FirstName,
        LastName,
        Email,
        Phone,
        Username,
        Password: hashedPassword
    });

    return newUser;
};

module.exports = {
    registerUser
};
