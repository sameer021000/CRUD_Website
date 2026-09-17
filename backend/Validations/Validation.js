const validateSignupData = (data) => {
    const { FirstName, LastName, Email, Phone, Username, Password } = data;
    
    if (!FirstName || !LastName || !Email || !Phone || !Username || !Password) {
        return { isValid: false, message: 'All fields are required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        return { isValid: false, message: 'Invalid email format' };
    }

    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!usernameRegex.test(Username)) {
        return { isValid: false, message: 'Username must be 8-15 characters and contain both letters and numbers' };
    }

    const hasUppercase = /[A-Z]/.test(Password);
    const hasLowercase = /[a-z]/.test(Password);
    const hasNumber = /[0-9]/.test(Password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(Password);
    const hasLength = Password.length >= 8 && Password.length <= 15;

    if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar && hasLength)) {
        return { isValid: false, message: 'Password does not meet complexity requirements' };
    }

    return { isValid: true };
};

module.exports = {
    validateSignupData
};
