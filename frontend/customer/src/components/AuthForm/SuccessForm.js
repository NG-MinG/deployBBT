import React, { useEffect } from "react";

import busLogo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import classes from "./LoginForm.module.css";

const SuccessForm = ({ type, closeForm, setSuccess }) => {

    const message = type === 'login' ? 'Đăng nhập thành công' : 'Đăng ký thành công';

    return (
        <>
            <div className={classes.login_form_backdrop}></div>
            <div className={classes.login_form}>
                <button
                    type="button"
                    className={classes.close_btn}
                    onClick={() => {
                        closeForm();
                        setSuccess('');
                    }}
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
                >
                    <FontAwesomeIcon style={
                        {fontSize: '8rem', color: 'green'}
                    } icon={faCircleCheck} />
                    <b style={{
                        textTransform: 'uppercase',
                        color: 'green',
                        marginTop: '1rem'
                    }}>{message}</b>
                </form>
                <div className={classes.login_form_footer}></div>
            </div>
        </>
    );
};

export default SuccessForm;
