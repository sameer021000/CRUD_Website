const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    LastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    Phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true
    },
    Username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [8, 'Username must be at least 8 characters'],
        maxlength: [15, 'Username cannot exceed 15 characters']
    },
    Password: {
        type: String,
        required: [true, 'Password is required']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
