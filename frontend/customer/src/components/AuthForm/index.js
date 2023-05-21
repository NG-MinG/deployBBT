import React, { useState } from "react";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "firebase/auth";

import { auth } from "../../configs/firebase-config";
import { auth as authStorage } from '../../utilities/storage';

import busLogo from "../../assets/images/logo.png";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import classes from "./LoginForm.module.css";
import Loader from "../Loader";

const LoginForm = ({ closeForm, nextStep, setUserInfo, setSuccess }) => {
    const [hasAccount, setHasAccount] = useState(true);
    const [user, setUser] = useState({
        phonenumber: "",
        password: "",
        passwordConfirm: "",
    });
    const [message, setMessage] = useState({
        type: "success",
        content: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "verify-container",
            {
                size: "invisible",
                // callback: (response) => {
                //   // reCAPTCHA solved, allow signInWithPhoneNumber.
                // }
            },
            auth
        );
    };

    const sendOTP = async (bodyData) => {
        axios
            .post(
                process.env.REACT_APP_API_HOST + "/auth/register/validate",
                bodyData
            )
            .then((res) => {
                generateRecaptcha();
                const appVerifier = window.recaptchaVerifier;
                signInWithPhoneNumber(
                    auth,
                    `+84${bodyData.user.phonenumber.substring(1)}`,
                    appVerifier
                )
                .then((confirmationResult) => {
                    setIsLoading(false);

                    window.confirmationResult = confirmationResult;
                    setUserInfo(res.data.user);
                    nextStep();
                })
                .catch((error) => {
                    setIsLoading(false);
                    setMessage({
                        type: "error",
                        content: "OTP send error"
                    });
                    console.log(error);
                });
            })
            .catch((err) => {
                setIsLoading(false);

                setMessage({
                    type: "error",
                    content: err.response.data.message
                });
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const bodyData = { user: { ...user } };

        if (hasAccount) {
            // Login
            delete bodyData.user.passwordConfirm;

            axios.post(process.env.REACT_APP_API_HOST + "/auth/login", bodyData)
            .then(res => {
                setIsLoading(false);
                authStorage.login(res.data.data);
                setSuccess('login');
            })
            .catch(err => {
                setIsLoading(false);
                setMessage({
                    type: "error",
                    content: err.response.data.message
                });
                console.log(err);
            })
        } else {
            // Register
            sendOTP(bodyData);
        }
    };

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <div className={classes.login_form_backdrop}></div>
            <div className={classes.login_form}>
                <button
                    type="button"
                    className={classes.close_btn}
                    onClick={closeForm}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className={classes.login_form_heading}>
                    <img src={busLogo} alt="logo" width={22} />
                    <span>Bus ticket booking</span>
                </div>
                <form
                    className={classes.login_form_main}
                    action=""
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    {
                        message.type === 'error' &&
                        <div className={classes.error_message}>{ message.content }</div>
                    }
                    <label className={classes.login_group}>
                        <b>Số điện thoại</b>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Nhập số điện thoại"
                            required
                            onChange={handleChange}
                            value={user.phonenumber}
                        />
                    </label>
                    <label className={classes.login_group}>
                        <b>Mật khẩu</b>
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            required
                            onChange={handleChange}
                            value={user.password}
                        />
                    </label>
                    {!hasAccount && (
                        <label className={classes.login_group}>
                            <b>Xác nhận mật khẩu</b>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Xác nhận mật khẩu"
                                required
                                onChange={handleChange}
                                value={user.passwordConfirm}
                            />
                        </label>
                    )}
                    <label className={classes.login_group_checkbox}>
                        <input
                            type="checkbox"
                            value="register"
                            checked={!hasAccount}
                            onChange={(e) => setHasAccount(!e.target.checked)}
                        />
                        <span>Chưa có tài khoản</span>
                    </label>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        name="login-btn"
                        className={classes.submit_btn}
                    >
                        <span>Tiếp tục</span>
                        { isLoading && <Loader /> }
                    </Button>
                </form>
                <div className={classes.login_form_footer}>
                    <div id="verify-container" />
                    {/* <strong>
                        * Lưu ý: <br />
                        Hệ thống sẽ tự động đăng ký tài khoản nếu khách hàng
                        chưa có tài khoản !
                    </strong> */}
                </div>
            </div>
        </>
    );
};

export default LoginForm;
