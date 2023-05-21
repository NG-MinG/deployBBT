import React, { useState } from 'react';

import classes from './Navbar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import LoginForm from '../AuthForm';
import ConfirmOTP from '../AuthForm/ConfirmOTP';
import SuccessForm from '../AuthForm/SuccessForm';
import { auth } from '../../utilities/storage';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
    const activeLink = ({ isActive }) => `${classes.link}${(isActive) ? ` ${classes.active}` : ''}`;

    const [showLogin, setShowLogin] = useState(false);
    const [step, setStep] = useState(0);
    const [success, setSuccess] = useState('');
    const [userInfo, setUserInfo] = useState({
        phonenumber: '',
        password: '',
        passwordConfirm: ''
    });

    console.log(success);

    const closeForm = () => {
        setShowLogin(false);
        setStep(0);
    };

    const nextStep = () => {
        if (step >= 2) return;

        setShowLogin(true);
        setStep(prev => prev + 1);
    };

    const navigate = useNavigate();

    // Step 0: Login / Register
    // Step 2: OTPRegister
    const authStep = [
        <LoginForm closeForm={closeForm} nextStep={nextStep} setUserInfo={setUserInfo} setSuccess={setSuccess} />,
        <ConfirmOTP closeForm={closeForm} userInfo={userInfo} setSuccess={setSuccess} />
    ];

    const isLogin = auth.isLogin();

    return <>
        { showLogin && ((['login', 'register'].includes(success)) ? <SuccessForm closeForm={closeForm} setSuccess={setSuccess} type={success} /> : authStep[step]) }
        <nav className={classes.navbar}>
            <NavLink to='/' className={`${classes.title} ${classes.link}`}>Bus Ticket Booking</NavLink>

            <div className={`${classes.main}`}>
                <NavLink to='/' className={activeLink}>Trang chủ</NavLink>
                <NavLink to='/schedules' className={activeLink}>Lịch trình</NavLink>
                <NavLink to='/branches' className={activeLink}>Bến xe</NavLink>
                <NavLink to='/about' className={activeLink}>Giới thiệu</NavLink>
            </div>

            <div className={classes.foot}>
                { !isLogin ? 
                    <>
                    <Button className={classes.contact_btn} outline onClick={() => navigate('/contact')}>
                        <FontAwesomeIcon className={classes.phoneIcon} icon={faPhone} />
                        <span>Liên hệ</span>
                    </Button>
                    <Button onClick={() => setShowLogin(true) }>Đăng nhập</Button>
                    </>
                    :
                    <div className={classes['user-dropdown']}>
                        <button type="button" className={classes.avatar}>
                            {/* <i class="fa-solid fa-user-circle "></i> */}
                            <FontAwesomeIcon className={classes['no-avatar']} icon={faUserCircle} />
                        </button>
                        <div className={classes['user-dropdown-list']}>
                            <div className={classes['user-box']}>
                                <div className={`${classes.link} ${classes['user-details']}`}>
                                    <FontAwesomeIcon className={classes['no-avatar']} icon={faUserCircle} />
                                    <span class="name">{ auth.getUserProfile().phone }</span>
                                </div>
                                <hr />
                                <Link className={classes.link} to="/user-profile"><FontAwesomeIcon icon={faUser} /> <span>Thông tin cá nhân</span></Link>
                                <Link className={classes.link} onClick={() => {
                                    auth.logout();

                                }} to='/'><FontAwesomeIcon icon={faSignOut} /> <span>Đăng xuất</span></Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
    </>
}

export default Navbar;