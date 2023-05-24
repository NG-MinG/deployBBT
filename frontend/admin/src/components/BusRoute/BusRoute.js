import styles from "./BusRoute.module.css";
import FilterIcon from "../../assets/svg/Account/filter.svg";
import DeleteIcon from "../../assets/svg/Account/delete.svg";
import EditIcon from "../../assets/svg/Station/edit.svg";
import AddIcon from "../../assets/svg/Station/add.svg";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BusRoute = () => {
  //Active, inactive modal
  const [show, setShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);

  //Handle state of modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreateClose = () => setCreateShow(false);
  const handleCreateShow = () => setCreateShow(true);

  //Handle data from database
  const [tripData, setTripData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  //Use for edit station
  const bustype = ["Ghế", "Giường", "Limousine"];
  const [trip, setTrip] = useState({
    _id: "",
    departure_city: "",
    arrival_city: "",
    bus_type: "",
    duration: "",
    distance: "",
  });

  const [searchData, setSearchData] = useState({
    search: "",
  });

  const handleSearchChange = (e) => {
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    setTrip((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_HOST + "/admin/gettrip")
      .then((res) => {
        setTripData(res.data.data.trip);
        setLocationData(res.data.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEdit = (e) => {
    const bodyData = { ...trip };
    if(bodyData.departure_city === '' || bodyData.arrival_city === '' || bodyData.bus_type === '' || bodyData.duration === '' || bodyData.distance === ''){
      alert('Thông tin không hợp lệ')
    }
    else{
      axios
      .post(
        process.env.REACT_APP_API_HOST + `/admin/edittrip/${trip._id}`,
        bodyData
      )
      .then((res) => {
        setTripData(res.data.data.trip);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const onCreate = (e) => {
    const bodyData = { ...trip };
    console.log(bodyData.duration)
    if(bodyData.departure_city === '' || bodyData.arrival_city === '' || bodyData.bus_type === '' || bodyData.duration === '' || bodyData.distance === ''){
      alert('Thông tin không hợp lệ')
    }
    else{
      axios
      .post(process.env.REACT_APP_API_HOST + `/admin/createtrip`, bodyData)
      .then((res) => {
        setTripData(res.data.data.trip);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const onDelete = (data) => {
    axios
      .post(process.env.REACT_APP_API_HOST + `/admin/deletetrip/${data._id}`)
      .then((res) => {
        setTripData(res.data.data.trip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearch = () => {
    axios
      .get(process.env.REACT_APP_API_HOST + `/admin/searchtrip?q=${searchData.search}`)
      .then((res) => {
        setTripData(res.data.data.trip);
        setLocationData(res.data.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles["a"]}>
      <div className={styles["header-container"]}>
        {/* <p>QUẢN LÝ TUYẾN XE</p> */}
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
              <th>Điểm đi</th>
              <th>Điểm đến</th>
              <th>Loại xe </th>
              <th>Thời gian di chuyển</th>
              <th>Khoảng cách</th>
              <th className={styles["small-space"]}></th>
              <th className={styles["small-space"]}></th>
            </tr>
          </thead>

          <tbody>
            {tripData.map((data) => (
              <tr>
                <td>{data.departure_city}</td>
                <td>{data.arrival_city}</td>
                <td>{data.bus_type}</td>
                <td>{data.duration}</td>
                <td>{data.distance}</td>
                <td>
                  <a
                    onClick={() => {
                      setShow(true);
                      setTrip(data);
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
            <div className={styles["modal-head"]}>CHỈNH SỬA TUYẾN XE</div>
          </Modal.Header>
          <Modal.Body>
            <form
              className={styles["modal-body-container"]}
              action=""
              method="POST"
            >
              <div className={styles["modal-row-container"]}>
                <div>Điểm đi</div>
                <select
                  name="departure_city"
                  id="departure_city"
                  onChange={handleChange}
                >
                  <option value="" selected disabled hidden>
                    {trip.departure_city}
                  </option>
                  {locationData.map((option) => (
                    <option value={option.location}>{option.location}</option>
                  ))}
                </select>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Điểm đến</div>
                <select
                  name="arrival_city"
                  id="arrival_city"
                  onChange={handleChange}
                >
                  <option value="" selected disabled hidden>
                    {trip.arrival_city}
                  </option>
                  {locationData.map((option) => (
                    <option value={option.location}>{option.location}</option>
                  ))}
                </select>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Loại xe</div>
                <select name="bus_type" id="bus_type" onChange={handleChange}>
                  <option value="" selected disabled hidden>
                    {trip.bus_type}
                  </option>
                  {bustype.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Thời gian</div>
                <input
                  type="number"
                  name="duration"
                  value={trip.duration}
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles["modal-row-container"]}>
                <div>Khoảng cách</div>
                <input
                  type="number"
                  name="distance"
                  value={trip.distance}
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


      <Modal show={createShow} onHide={handleCreateClose}>
        <Modal.Header>
          <div className={styles["modal-head"]}>TẠO TUYẾN XE</div>
        </Modal.Header>
        <Modal.Body>
          <form
            className={styles["modal-body-container"]}
            action=""
            method="POST"
          >
            <div className={styles["modal-row-container"]}>
              <div>Điểm đi</div>
              <select
                name="departure_city"
                id="departure_city"
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Chọn điểm đi
                </option>
                {locationData.map((option) => (
                  <option value={option.location}>{option.location}</option>
                ))}
              </select>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Điểm đến</div>
              <select
                name="arrival_city"
                id="arrival_city"
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Chọn điểm đến
                </option>
                {locationData.map((option) => (
                  <option value={option.location}>{option.location}</option>
                ))}
              </select>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Loại xe</div>
              <select name="bus_type" id="bus_type" onChange={handleChange}>
                <option value="" selected disabled hidden>
                  Chọn loại xe
                </option>
                {bustype.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Thời gian</div>
              <input
                type="number"
                name="duration"
                placeholder="Nhập thời gian di chuyển"
                required
                onChange={handleChange}
              ></input>
            </div>
            <div className={styles["modal-row-container"]}>
              <div>Khoảng cách</div>
              <input
                type="number"
                name="distance"
                placeholder="Nhập khoảng cách"
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

export default BusRoute;
