import styles from "./AdminLayout.module.css";
import { NavLink, Navigate, Outlet, Route, redirect, useLocation, useNavigate } from "react-router-dom";

import DashBoardIcon from "../assets/svg/sidebar/dashboard.svg";
import ActiveIcon from "../assets/svg/sidebar/active.svg";
import AccountIcon from "../assets/svg/sidebar/account.svg";
import BusTypeIcon from "../assets/svg/sidebar/bustype.svg";
import BusStationIcon from "../assets/svg/sidebar/busstation.svg";
import BusRouteIcon from "../assets/svg/sidebar/busroute.svg";
import Ticket from "../assets/svg/sidebar/ticket.svg";
import { ReactComponent as UserProfileIcon } from '../assets/svg/Navbar/user.svg';
import { ReactComponent as ChevronRight } from '../assets/svg/Navbar/chevronRight.svg';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronRight, faRotateRight, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../utils/storage";

const AdminPage = () => {
  const sidebarData = [
    {
      icon: DashBoardIcon,
      title: "Dashboard",
      path: "/admin/dashboard"
    },
    {
      icon: AccountIcon,
      title: "Tài khoản",
      path: "/admin/account"
    },
    {
      icon: BusStationIcon,
      title: "Trạm xe",
      path: "/admin/bus-station"
    },
    {
      icon: BusRouteIcon,
      title: "Tuyến xe",
      path: "/admin/bus-route"
    },
    {
      icon: Ticket,
      title: "Vé xe",
      path: "/admin/manage-ticket",
    },
  ]

  const subData = [
    {
      title: "Quản lí vé xe",
      path: "/admin/manage-ticket/ticket"
    },
    {
      title: "Vé xe đã đặt",
      path: "/admin/manage-ticket/ticket-order"
    }
  ]

  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/admin/manage-ticket") navigate("/admin/manage-ticket/ticket")
  }, [location]);

  const pageIndex = sidebarData.findIndex((el) => location.pathname.indexOf(el.path) > -1);

  const mainPage = (pageIndex > -1) ? sidebarData[pageIndex] : null;
  const subPage = subData.find(el => location.pathname === el.path);
  const subDataPage = (pageIndex === sidebarData.length - 1 && subPage) ? subPage : null;

  const titleArr = [''];
  if (mainPage) titleArr.push(<span>{ mainPage.title }</span>);
  if (subDataPage) {
    titleArr.push(<ChevronRight width={13} />);
    titleArr.push(<span>{subDataPage.title}</span>);
  };

  if (location.pathname.indexOf('admin/manage-ticket/ticket/details')> -1) {
    titleArr.splice(0, titleArr.length);

    titleArr.push(<span>Quản lý vé xe</span>);
    titleArr.push(<ChevronRight width={13} />);
    titleArr.push(<span>Chi tiết vé xe</span>);
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-container"]}>
        <div className={styles["menu-container"]}>
          {sidebarData.map((data, index) => (
            <NavLink to={data.path} className={styles["menu-content"]} style={({ isActive }) => {
              return isActive ? { color: "#ffffff" } : { color: "#B7B1B1" }
            }}>

              {({ isActive }) => {
                return isActive ?
                  <>
                    <div className={styles["sub-menu-content"]}>
                      <img src={data.icon} className={styles["meun-icon"]}></img>
                      <div className={styles["menu-text"]}>{data.title}</div>
                    </div>
                    <img src={ActiveIcon} style={{ "margin-left": "0.5rem" }} className={styles["meun-icon"]} />
                    {index === sidebarData.length - 1
                      &&
                      <div className={styles["ticket-item"]}>
                        {subData.map((data) => (
                          <NavLink to={data.path} className={styles["ticket-item-content"]}
                            style={({ isActive }) => { return (isActive) ? { color: "#ffffff" } : { color: "#B7B1B1" } }}
                          >{data.title}</NavLink>
                        ))}
                      </div>}
                  </> :
                  <>
                    <div className={styles["sub-menu-content"]}>
                      <img src={data.icon} className={styles["meun-icon"]}></img>
                      <div className={styles["menu-text"]}>{data.title}</div>
                    </div>
                  </>
              }}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
      </div>
      <div className={styles["main_content"]}>
        <div className={styles["navbar"]}>
          <div className={styles['controls']}>
            <button type='button' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button type='button' onClick={() => navigate(0)}><FontAwesomeIcon icon={faRotateRight} /></button>
          </div>
          <div className={styles["navbar_title"]}>
            {titleArr}
          </div>
          <div className={styles['user_profile']}>
            <UserProfileIcon width={40} />
              <div>
                <div className={styles['user_name']}>{ auth.getUserProfile().fullname }</div>
                <div className={styles['user_role']}>{ auth.getUserProfile().role }</div>
              </div>
          </div>
          <button onClick={() => {
            auth.logout();
            navigate('/admin/login');
          }} className={styles.signout_btn}><FontAwesomeIcon icon={faSignOut} /></button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
