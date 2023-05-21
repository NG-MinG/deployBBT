import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        //required: [true, 'Please tell us your name!']
    },
    username: String,
    password: {
        type: String,
        //required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    phone: String,
    email: {
        type: String,
        //required: [true, 'Please provide your email'],
        //unique: true,
        lowercase: true,
        //validate: [validator.isEmail, 'Please provide a valid email']
    },
    dob: String,
    address: String,
    gender: String,
    avatar: String,
    passwordChangedAt: Date,
    userVerifyToken: String,
    passwordResetExpires: Date,
    myTicket: [String],
    active: {
        type: Boolean,
        default: true,
    },
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;

    next();
});

userSchema.pre(/^find/, function (next) {
    // this points to the current query
    // this.find({active: { $ne: false }})
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.index(
    {
        fullname: 'text',
        gender: 'text',
        dob: 'text',
        email: 'text',
        phone: 'text',
        address: 'text',
    },
    { default_language: 'none' }
);

const User = mongoose.model('users', userSchema);

export default User;