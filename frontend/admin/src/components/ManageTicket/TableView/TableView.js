import {ReactComponent as SelectIcon} from "../../../assets/svg/ManageTicket/white_down_arrow.svg";
import {ReactComponent as EditIcon} from "../../../assets/svg/ManageTicket/edit.svg";
import {ReactComponent as RemoveIcon} from "../../../assets/svg/ManageTicket/remove.svg";
import {useSelector, useDispatch} from "react-redux";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { deleteTicket, getTicketUpdating } from "../../../store/reducers/ticketManagingSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from "./TableView.module.css";
import axios from "axios";


const TableView = (props) => {
    const tickets = useSelector((state) => state.ticketManaging.tickets);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentTickets, setCurrentTickets] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedBusType, setSelectedBusType] = useState('');
    const currentDate = new Date().toISOString();

    useEffect(() => {
        setCurrentTickets([...tickets])
    }, [tickets])

    const handleDeleteTicket = (ticketId) => {
        axios.delete(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/delete-ticket/${ticketId}`).then((res) => {
            if (res.data.status === "success") {
                alert("Vé đã được xóa thành công!");
                dispatch(deleteTicket(ticketId));
                navigate("/admin/manage-ticket/ticket");
                
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    const handleUpdateTicket = (ticketId) => {
        dispatch(getTicketUpdating(ticketId));
        props.onCRUDTicket();
    }
    //------ FILTER PROCESSING ------
    // filter based on hours
    const handleTimeSelectChange = (e) => {
        let ticketsFiltered = [...tickets];
        if (e.target.value !== "Thời gian") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return parseInt(el.departure_time.split(":")[0]) >= parseInt(e.target.value.split("-")[0]) 
                && parseInt(el.departure_time.split(":")[0]) <= parseInt(e.target.value.split("-")[1]);
            })
            ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.departure_time.split(":")[0]) - parseInt(b.departure_time.split(":")[0]));
        }
        if (selectedPrice && selectedPrice !== "Giá vé") {
            if (selectedPrice === "LowToHigh") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => a.price - b.price);
            } else if (selectedPrice === "HighToLow") { 
                ticketsFiltered = ticketsFiltered.sort((a,b) => b.price - a.price);
            }
        } 
        if (selectedBusType && selectedBusType !== "Loại xe") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return el.bus_type === selectedBusType;
            })
        }
        setCurrentTickets(ticketsFiltered);
        setSelectedTimeRange(e.target.value);
    }

    // sort based on price
    const handlePriceChange = (e) => {
        let ticketsFiltered = [...tickets];
        if (e.target.value !== "Giá vé") {
            if (e.target.value === "LowToHigh") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => a.price - b.price);
            }
            else if (e.target.value === "HighToLow") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => b.price - a.price);
            }
        }
        if (selectedTimeRange && selectedTimeRange !== "Thời gian") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return parseInt(el.departure_time.split(":")[0]) >= parseInt(selectedTimeRange.split("-")[0]) 
                && parseInt(el.departure_time.split(":")[0]) <= parseInt(selectedTimeRange.split("-")[1]);
            })
            // ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.departure_time.split(":")[0]) - parseInt(b.departure_time.split(":")[0]));
        }
        if (selectedBusType && selectedBusType !== "Loại xe") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return el.bus_type === selectedBusType;
            })
        }
        setCurrentTickets(ticketsFiltered);
        setSelectedPrice(e.target.value);
    }

    // filter based on bus type
    const handleBusTypeChange = (e) => {
        let ticketsFiltered = [...tickets];
        if (e.target.value !== "Loại xe") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return el.bus_type === e.target.value;
            })
        }
        if (selectedPrice && selectedPrice !== "Giá vé") {
            if (selectedPrice === "LowToHigh") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => a.price - b.price);
            } else if (selectedPrice === "HighToLow") { 
                ticketsFiltered = ticketsFiltered.sort((a,b) => b.price - a.price);
            }
        } 
        if (selectedTimeRange && selectedTimeRange !== "Thời gian") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return parseInt(el.departure_time.split(":")[0]) >= parseInt(selectedTimeRange.split("-")[0]) 
                && parseInt(el.departure_time.split(":")[0]) <= parseInt(selectedTimeRange.split("-")[1]);
            })
            ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.departure_time.split(":")[0]) - parseInt(b.departure_time.split(":")[0]));
        }
        setCurrentTickets(ticketsFiltered);
        setSelectedBusType(e.target.value);
    }

    
    return (
        <>
        <div className={styles["table-section"]}>
        <div className={styles["table-container"]}>
            <table className = {styles["ticket-table"]}>
                <thead className = {styles["thead"]}>
                    <tr>
                        <th className = {styles["time-heading"]}>
                            <select value = {selectedTimeRange} onChange = {handleTimeSelectChange} name="date-time" id="" className={null}>
                                <option value="Thời gian">Thời gian</option>
                                <option value="0-6">0h-6h</option>
                                <option value="6-12">6h-12h</option>
                                <option value="12-18">12h-18h</option>
                                <option value="18-24">18h-24h</option>
                            </select>
                        </th>
                        <th className = {styles["departure-depot-heading"]}>
                            <select name="departure-depot" id="" className={null}>
                                <option value="" disabled selected>Điểm lên</option>
                            </select>
                        </th>
                        <th className = {styles["arrival-depot-heading"]}>
                            <select name="arrival-depot" id="" className={null}>
                                <option value="" disabled selected>Điểm xuống</option>
                            </select>
                        </th>
                        <th className = {styles["bus-type-heading"]}>
                            <select value = {selectedBusType} onChange = {handleBusTypeChange} name="bus-type" id="" className={null}>
                                <option value="Loại xe">Loại xe</option>
                                <option value="Ghế">Ghế</option>
                                <option value="Giường">Giường</option>
                                <option value="Limousine">Limousine</option>
                            </select>
                        </th>
                        <th className = {styles["ticket-price-heading"]}>
                            <select value = {selectedPrice} onChange = {handlePriceChange} name="departure-depot" id="" className={null}>
                                <option value="Giá vé">Giá vé</option>
                                <option value="LowToHigh">Tăng dần</option>
                                <option value="HighToLow">Giảm dần</option>
                            </select>
                        </th>
                        <th className = {styles["temp-heading"]}></th>
                        <th className = {styles["temp-heading"]}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.length > 0 ? currentTickets.map((el, index) => {
                        return <tr key = {el.id}>    
                        <td className = {styles["date-time"]} style = {{display: "flex", gap: "1.5rem"}}>
                            <span className={styles["date"]}>
                                {el.truncatedDate}
                            </span>
                            <span className={styles["time"]}>
                                {el.departure_time}-{el.arrival_time}
                            </span>
                        </td>
                        <td className = {styles["departure-depot"]}>{el.departure_depot}</td>
                        <td className = {styles["arrival-depot"]}>{el.arrival_depot}</td>
                        <td className = {styles["bus-type"]}>{el.bus_type}</td>
                        <td className = {styles["ticket-price"]}>{String(el.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}</td>
                        <td className = {styles["crud"]}><button className={styles["edit-btn"]}>
                            {currentDate.slice(0,10) <= el.date.slice(0,10) ?  <EditIcon onClick = {() => handleUpdateTicket(el.id)} className = {styles["edit-icn"]}/>
                             : <FontAwesomeIcon onClick={() => { navigate(`details/${el.id}`) }} icon={faEye} style={{ color: '#1F84BD', fontSize: "1.5em", marginTop: "0.2em" }} />}
                        </button></td>
                        <td className = {styles["crud"]}><button className={styles["remove-btn"]}>
                            <RemoveIcon onClick = {() => handleDeleteTicket(el.id)} className = {styles["edit-icn"]}/>
                        </button></td>
                    </tr>
                    }) : null}
                </tbody>
            </table>
            {currentTickets.length === 0 && <div style ={{fontSize: "2rem", marginTop: "1rem", textAlign: "center"}}>Không tìm thấy thông tin chuyến!</div>}
        </div>
    </div>
    </>
    ) 
    
}

export default TableView;