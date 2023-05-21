import React, { useState } from "react";
import { auth as authStorage } from '../../utils/storage';

import busLogo from "../../assets/images/logo.png";
import Button from "../Button";
import axios from "axios";

import classes from "./LoginForm.module.css";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const bodyData = { user: { ...user }, action: 'admin_login' };

            // Login
        delete bodyData.user.passwordConfirm;

        axios.post(process.env.REACT_APP_API_HOST + "/auth/login", bodyData)
        .then(res => {
            setIsLoading(false);
            authStorage.login(res.data.data);

            navigate('/admin/dashboard');
        })
        .catch(err => {
            setIsLoading(false);
            setMessage({
                type: "error",
                content: err.response.data.message
            });
            console.log(err);
        });
    };

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <div className={classes.login_form_backdrop}></div>
            <div className={classes.login_form}>
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
