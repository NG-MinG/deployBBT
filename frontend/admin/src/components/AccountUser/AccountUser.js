import styles from "./AccountUser.module.css";
import FilterIcon from "../../assets/svg/Account/filter.svg";
import DeleteIcon from "../../assets/svg/Account/delete.svg";
import BanIcon from "../../assets/svg/Account/ban.svg";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AccountUser = () => {
  const [accountData, setAccountData] = useState([]);
  const [searchData, setSearchData] = useState({
    search: "",
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_HOST + "/admin/getaccount")
      .then((res) => {
        setAccountData(res.data.data.account);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSearch = () => {

    axios
      .get(process.env.REACT_APP_API_HOST + `/admin/searchaccount?q=${searchData.search}`)
      .then((res) => {
        setAccountData(res.data.data.account);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBan = (id) => {
    axios
      .post(process.env.REACT_APP_API_HOST + `/admin/banaccount/${id}`)
      .then((res) => {
        setAccountData(res.data.data.account);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDelete = (id) => {
    axios
      .post(process.env.REACT_APP_API_HOST + `/admin/deleteaccount/${id}`)
      .then((res) => {
        setAccountData(res.data.data.account);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles["a"]}>
      <div className={styles["header-container"]}>
        <p>QUẢN LÝ TÀI KHOẢN</p>
        <div className={styles["sub-header-container"]}>
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm"
            required
            onChange={handleSearchChange}
          ></input>
          <a className={styles["search-button"]} onClick={onSearch}>
            <div>TÌM KIẾM </div>
          </a>
        </div>
      </div>
      <div className={styles["listAccount"]}>
        <table className={styles["table-containter"]}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {accountData.map((data) => (
              <tr>
                <td>{data.fullname}</td>
                <td>{data.gender}</td>
                <td>{data.dob}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td>{data.active ? "Active" : "Inactive"}</td>
                <td>
                  <a
                    onClick={() => {
                      onDelete(data._id);
                    }}
                  >
                    <img src={DeleteIcon} />
                  </a>
                </td>
                <td>
                  <a
                    onClick={() => {
                      onBan(data._id);
                    }}
                  >
                    <img src={BanIcon} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountUser;
