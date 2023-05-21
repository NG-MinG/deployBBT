import React, { useEffect, useState } from "react";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    getIdToken,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../configs/firebase-config";

import busLogo from "../../assets/images/logo.png";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import classes from "./LoginForm.module.css";
import Loader from "../Loader";

const ConfirmOTP = ({ closeForm, userInfo, setSuccess }) => {
    const [otp_code, setOTP] = useState("");
    const [message, setMessage] = useState({
        type: "success",
        content: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (otp_code.length === 6) {
            setIsLoading(true);
    
            const { confirmationResult } = window;
            confirmationResult
            .confirm(otp_code)
            .then(() => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const firebaseToken = await getIdToken(user);
                        const bodyData = { user: { ...userInfo, firebaseToken: firebaseToken } };

                        console.log(bodyData);

                        axios
                        .post(
                            process.env.REACT_APP_API_HOST + "/auth/register",
                            bodyData
                        )
                        .then((res) => {
                            if (res.data.status === "success") {
                                setIsLoading(false);
                                setSuccess('register');
                            }
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            setMessage({
                                type: "error",
                                content: error.response.data.message
                            });
                            console.log(error);
                        });
                    }
                });
            })
            .catch((error) => {
                setIsLoading(false);
                setMessage({
                    type: "error",
                    content: 'Invalid OTP code'
                });
                console.log(error);
            });
        }
    };

    const handleChange = (e) => {
        setOTP(e.target.value);
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
                        <b>Mã OTP</b>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Nhập mã OTP"
                            required
                            onChange={handleChange}
                            value={otp_code}
                        />
                    </label>
                    <span className={classes.resend_group}>
                        Không nhận được mã OTP ? <a href="#resend">Gửi lại</a>
                    </span>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        name="login-btn"
                        className={classes.submit_btn}
                    >
                        <span>Xác nhận</span>
                        { isLoading && <Loader /> }
                    </Button>
                </form>
                <div className={classes.login_form_footer}>
                    <strong>
                        * Lưu ý: <br />
                        Không chia sẻ mã OTP của bạn cho bất cứ ai!
                    </strong>
                </div>
            </div>
        </>
    );
};

export default ConfirmOTP;
