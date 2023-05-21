import styles from "./BusStation.module.css";
import FilterIcon from "../../assets/svg/Account/filter.svg";
import DeleteIcon from "../../assets/svg/Account/delete.svg";
import EditIcon from "../../assets/svg/Station/edit.svg";
import AddIcon from "../../assets/svg/Station/add.svg";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BusStation = () => {
  //Active, inactive modal
  const [show, setShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);

  //Handle state of modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateClose = () => setCreateShow(false);
  const handleCreateShow = () => setCreateShow(true);

  //Handle data from database
  const [stationData, setStationData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  //Use for edit station
  const [station, setStation] = useState({
    _id: "",
    oldlocation: "",
    location: "",
    oldname: "",
    name: "",
    address: "",
    phone: "",
  });

  const [searchData, setSearchData] = useState({
    search: "",
  });

  const handleSearchChange = (e) => {
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    setStation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_HOST + "/admin/getstation")
      .then((res) => {
        setStationData(res.data.data.station);
        setLocationData(res.data.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSearch = () => {
  
    axios
      .get(process.env.REACT_APP_API_HOST + `/admin/searchstation?q=${searchData.search}`)
      .then((res) => {
        setStationData(res.data.data.station);
        setLocationData(res.data.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = (e) => {
    const bodyData = { ...station };
    if(bodyData.location === '' || bodyData.name === '' || bodyData.address === '' || bodyData.phone === ''){
      alert('Thông tin không hợp lệ')
    }
    else{
      axios
        .post(
          process.env.REACT_APP_API_HOST + `/admin/editstation/${station._id}`,
          bodyData
        )
        .then((res) => {
          setStationData(res.data.data.station);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onCreate = (e) => {
    const bodyData = { ...station };
    if(bodyData.location === '' || bodyData.name === '' || bodyData.address === '' || bodyData.phone === ''){
      alert('Thông tin không hợp lệ')
    }
    else{
      axios
      .post(process.env.REACT_APP_API_HOST + `/admin/createstation`, bodyData)
      .then((res) => {
        setStationData(res.data.data.station);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const onDelete = (data) => {
    axios
      .post(
        process.env.REACT_APP_API_HOST +
          `/admin/deletestation?id=${data._id}&name=${data.name}`
      )
      .then((res) => {
        setStationData(res.data.data.station);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles["a"]}>
      <div className={styles["header-container"]}>
        {/* <p>QUẢN LÝ TRẠM XE</p> */}
        <a className={styles["add-button"]} onClick={setCreateShow}>
          <div>THÊM MỚI </div>
          <img src={AddIcon} />
        </a>
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
              <th>Địa điểm</th>
              <th>Trạm xe</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th className={styles["small-space"]}></th>
              <th className={styles["small-space"]}></th>
            </tr>
          </thead>

          <tbody>
            {stationData.map((data) => (
              <tr>
                <td>{data.location}</td>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.phone}</td>
                <td>
                  <a
                    onClick={() => {
                      setShow(true);
                      setStation(data);
                    }}
                  >
                    <img src={EditIcon} />
                  </a>
                </td>

                <td>
                  <a
                    onClick={() => {
                      onDelete(data);
                    }}
                  >
                    <img src={DeleteIcon} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <div className={styles["modal-head"]}>CHỈNH SỬA TRẠM XE</div>
          </Modal.Header>
          <Modal.Body>
            <form
              className={styles["modal-body-container"]}
              action=""
              method="POST"
            >
              <div className={styles["modal-row-container"]}>
                <div>Địa điểm</div>
                <select name="location" id="location" onChange={handleChange}>
                  <option value="" selected disabled hidden>
                    {station.location}
                  </option>
                  {locationData.map((option) => (
                    <option value={option.location}>{option.location}</option>
                  ))}
                </select>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Trạm xe</div>
                <input
                  type="text"
                  name="name"
                  value={station.name}
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Địa chỉ</div>
                <input
                  type="text"
                  name="address"
                  value={station.address}
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Số điện thoại</div>
                <input
                  type="text"
                  name="phone"
                  value={station.phone}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className={styles["modal-cancel-button"]}
              onClick={handleClose}
            >
              <div>Hủy</div>
            </button>

            <button
              className={styles["modal-save-button"]}
              onClick={() => {
                onEdit();
                handleClose();
              }}
            >
              <div>Lưu thay đổi</div>
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* <div className={styles["foot-new"]}>
        <a className={styles["add-button"]} onClick={setCreateShow}>
          <div>THÊM MỚI </div>
          <img src={AddIcon} />
        </a>
      </div> */}

      <Modal show={createShow} onHide={handleCreateClose}>
        <Modal.Header>
          <div className={styles["modal-head"]}>TẠO TRẠM XE</div>
        </Modal.Header>
        <Modal.Body>
          <form
            className={styles["modal-body-container"]}
            action=""
            method="POST"
          >
            <div className={styles["modal-row-container"]}>
              <div>Địa điểm</div>
              <select name="location" id="location" onChange={handleChange}>
                <option value="" selected disabled hidden>
                  Chọn địa điểm
                </option>
                {locationData.map((option) => (
                  <option value={option.location}>{option.location}</option>
                ))}
              </select>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Trạm xe</div>
              <input
                type="text"
                name="name"
                placeholder="Nhập trạm xe"
                required
                onChange={handleChange}
              ></input>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Địa chỉ</div>
              <input
                type="text"
                name="address"
                placeholder="Nhập địa chỉ"
                required
                onChange={handleChange}
              ></input>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Số điện thoại</div>
              <input
                type="text"
                name="phone"
                placeholder="Nhập số điện thoại"
                required
                onChange={handleChange}
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={styles["modal-cancel-button"]}
            onClick={handleCreateClose}
          >
            <div>Hủy</div>
          </button>

          <button
            className={styles["modal-save-button"]}
            onClick={() => {
              onCreate();
              handleCreateClose();
            }}
          >
            <div>Lưu thay đổi</div>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BusStation;
