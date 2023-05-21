import jwt from 'jsonwebtoken';
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Validator from "../utils/Validator.js";
import REGEX from '../constants/regex.js';
import firebase from '../firebase/firebase.js';
import User from "../models/userModel.js";
import { promisify } from 'util';

const signToken = function (id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/*
    AUTH CONTROLLER
    1. login
    2. register
    3. forgot password
    4. reset password
*/

/// > LOGIN
const login = catchAsync(async (req, res, next) => {

    // Validate request body
    if (!Validator.isValidRequestBody(req.body.user, ['phonenumber', 'password']))
        return next(new AppError("Bad request", 400));

    // Validate phonenumber, password and password confirm
    const { phonenumber, password } = req.body.user;

    if (Validator.isEmptyString(phonenumber) || Validator.isEmptyString(password))
        return next(new AppError("Tài khoản hoặc mật khẩu không chính xác", 401));

    else if (isNaN(+phonenumber) || !Validator.isMatching(phonenumber, REGEX.PHONE_NUMBER))
        return next(new AppError("Tài khoản hoặc mật khẩu không chính xác", 401));

    else if (password.length < 8)
        return next(new AppError('Tài khoản hoặc mật khẩu không chính xác', 401));

    const user = await User.findOne({ phone: phonenumber }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password)) || !user.active) {
        return next(new AppError('Tài khoản hoặc mật khẩu không chính xác', 401));
    }
    
    if (req.body.action === 'admin_login' && user.role !== 'admin') 
        return next(new AppError('Tài khoản hoặc mật khẩu không chính xác', 401));

    const token = signToken(user._id);

    const userInfo = {
        user,
        access_token: token
    };

    res.status(200).json({
        status: 'success',
        data: userInfo
    });
});

/// > REGISTER
const validateRegister = catchAsync(async (req, res, next) => {

    // Validate request body
    if (!Validator.isValidRequestBody(req.body.user, ['phonenumber', 'password', 'passwordConfirm']))
        return next(new AppError("Bad request", 400));

    // Validate phonenumber, password and password confirm
    const { phonenumber, password, passwordConfirm } = req.body.user;

    if (Validator.isEmptyString(phonenumber) || Validator.isEmptyString(password) || Validator.isEmptyString(passwordConfirm))
        return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400));

    else if (isNaN(+phonenumber) || !Validator.isMatching(phonenumber, REGEX.PHONE_NUMBER))
        return next(new AppError("Số điện thoại không tồn tại", 400));

    else if (password.length < 8)
        return next(new AppError('Mật khẩu của bạn quá yếu (tối thiểu 8 kí tự)', 400));

    else if (password !== passwordConfirm)
        return next(new AppError("Mật khẩu của bạn không khớp", 400));


    const founded_user = await User.findOne({ phone: phonenumber });

    if (founded_user)
        return next(new AppError("Tài khoản đã tồn tại", 400));

    return res.status(200).json({
        status: "success",
        user: {
            phonenumber: phonenumber,
            password: password,
            passwordConfirm: passwordConfirm
        }
    });

});

const register = catchAsync(async (req, res, next) => {

    if (
        !Validator.isValidRequestBody(req.body.user, [
            'phonenumber',
            'password',
            'passwordConfirm',
            'firebaseToken',
        ])
    )
        return next(new AppError('Bad request', 400));

    // Validate phonenumber, password and password confirm
    const { phonenumber, password, passwordConfirm, firebaseToken } = req.body.user;

    if (
        Validator.isEmptyString(phonenumber) ||
        Validator.isEmptyString(password) ||
        Validator.isEmptyString(passwordConfirm) ||
        Validator.isEmptyString(firebaseToken)
    )
        return next(new AppError('Please provide phonenumber, password and password confirm', 400));
    else if (isNaN(+phonenumber) || !Validator.isMatching(phonenumber, REGEX.PHONE_NUMBER))
        return next(new AppError('Please provide a valid phonenumber', 400));
    else if (password.length < 8)
        return next(new AppError('Password is too weak (minimum 8 character)', 400));
    else if (password !== passwordConfirm) return next(new AppError('Password and password confirm do not match', 400));

    const founded_user = await User.findOne({ phone: phonenumber });

    if (founded_user)
        return next(new AppError('This phonenumber has already been registered', 400));

    const decodedFirebase = await firebase.auth().verifyIdToken(firebaseToken);

    if (phonenumber.substring(1) !== decodedFirebase?.phone_number.substring(3))
        return next(new Error('Phone number is invalid with the phone varification', 401));

    const user = await User.create({ phone: phonenumber, password });

    return res.status(200).json({
        status: 'success',
        message: 'Register successful',
    });
});

/// > FORGOT PASSWORD
const forgot = catchAsync(async (req, res, next) => {

    res.status(200).json({
        status: "success",
        message: "Forgot successful"
    });

});

/// > RESET PASSWORD
const reset = catchAsync(async (req, res, next) => {

    res.status(200).json({
        status: "success",
        message: "Reset successful"
    });

});

/// > PROTECT
const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];

    if (!token)
        return next(new AppError('You are not logged in! Please log in to get access'), 401);

    // 2) Verfication token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
        return next(new AppError('The user belonging to this token does no longer exist.', 401));

    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat))
    //     return next(new AppError('User recently changed password! Please log in again.'), 401);

    // GRANT ACCESS TO PROTECT ROUTE
    req.user = currentUser;
    next();
});

export default { login, register, forgot, reset, validateRegister, protect };