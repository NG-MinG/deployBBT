import styles from "./ManageTicketPage.module.css";
import Searching from "../../components/ManageTicket/Searching/Searching";
import PlaceChoosing from "../../components/ManageTicket/PlaceChoosing/PlaceChoosing";
import TableView from "../../components/ManageTicket/TableView/TableView";
import SeatLayout from "../../components/SeatLayout/SeatLayout";
import CreateButton from "../../components/CreateButton/CreateButton";
import {ReactComponent as ToIcon} from "../../assets/svg/ManageTicket/right_arrow.svg";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTicketDetails, addNewTicket, updateTicket} from "../../store/reducers/ticketManagingSlice.js";
import axios from 'axios';
import ChairLayout from "../../components/BusLayout/ChairLayout/ChairLayout";
import SleeperLayout from "../../components/BusLayout/SleeperLayout/SleeperLayout";
import LimousineLayout from "../../components/BusLayout/LimousineLayout/LimousineLayout";
import { useNavigate } from "react-router-dom";



const ManageTicketPage = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const tickets = useSelector((state) => state.ticketManaging.tickets); 
    const currentTicketDetails = useSelector((state) => state.ticketManaging.currentTicketDetails);
    // used for crud ticket form
    const [selectedChange, setSelectedChange] = useState({
        departure_city: '',
        arrival_city: '',
        departure_depot: '',
        arrival_depot: '',
        bus_type: '',
    });

    const [inputChange, setInputChange] = useState({
        date: '',
        time: '',
        price: '',
    })
    // show modal form when creating new ticket
    const [IsCRUDTicket, setIsCRUDTicket] = useState(false);
    // distinguish between fromHCM and toHCM state
    const [placeChoosing, setPlaceChoosing] = useState({
        fromHCM: true,
        toHCM: false,
    })
    // used for get locations and stations data
    const [locations, setLocations] = useState([]);
    const [stations, setStations] = useState([]);
    
    // handle state changes
    const handleFirstPlaceChoosingClick = () => {
        setPlaceChoosing((pre) => {
            return {
                ...pre,
                fromHCM: true,
                toHCM: false,
            }
        })
    } 

    const handleSecondPlaceChoosingClick = () => {
        setPlaceChoosing((pre) => {
            return {
                ...pre,
                fromHCM: false,
                toHCM: true,
            }
        })
    } 

    const cancelCRUDTicket = () => {
        dispatch(setCurrentTicketDetails({}));
        setIsCRUDTicket(false);
    }

    // handle select changes in CRUD ticket form
    const handleSelectChange = (event) => {
        const {name, value} = event.target;
        let total_seats = 0;
        if (name === "bus_type") {
            if (value === "Ghế") {
                total_seats = 28;
            }
            else if (value === "Giường") {
                total_seats = 36;
            }
            else if (value === "Limousine") {
                total_seats = 32;
            }
        }
        setSelectedChange((pre) => {
            return {
                ...pre,
                [name]: value,
            }
        })
        let travel_time = currentTicketDetails.travel_time;
        let distance =  currentTicketDetails.distance;
        
        if (selectedChange.departure_city !== '' && name === "arrival_city") {
            const trip = trips.find(el => el.departure_city === selectedChange.departure_city 
                && el.arrival_city === value);
            travel_time = trip.duration;
            distance = trip.distance;
        }
        else if (selectedChange.arrival_city !== '' && name === "departure_city") {
            const trip = trips.find(el => el.arrival_city === selectedChange.arrival_city && el.departure_city === value);
            travel_time = trip.duration;
            distance = trip.distance;
        }

        dispatch(setCurrentTicketDetails({
            ...currentTicketDetails,
            [name]: value,
            total_seats: total_seats,
            travel_time: travel_time,
            distance: distance,
        }));
    }
    // handle input changes in CRUD ticket form
    const handleInputChange = (event) => {
        const {name, value} = event.target; 
        setInputChange((pre) => {
            if (name === "date") {
                const regex = /^([0-2]?[0-9]|[3][0-1])-(0?[1-9]|1[0-2])-(\d{4})$/;
                if (regex.test(value)) {
                    const dateParts = value.split('-');
                    const day = dateParts[0].padStart(2, '0');
                    const month = dateParts[1].padStart(2, '0');
                    const year = dateParts[2];
                    const isoDateString = new Date(`${year}-${month}-${day}`).toISOString();
                    dispatch(setCurrentTicketDetails({
                        ...currentTicketDetails,
                        date: isoDateString,
                    }))
                } 
                else dispatch(setCurrentTicketDetails({
                    ...currentTicketDetails,
                    date: '',
                }))
            }
            else if (name === "time") {
                const regex =/^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
                if (regex.test(value)) {
                    const departure_time =  value.split('-')[0];
                    const arrival_time = value.split('-')[1];
                    dispatch(setCurrentTicketDetails({
                        ...currentTicketDetails,
                        departure_time: departure_time,
                        arrival_time: arrival_time
                    }))
                }
                else dispatch(setCurrentTicketDetails({
                    ...currentTicketDetails,
                    departure_time: '',
                    arrival_time: ''
                }))
            }
            else {
                dispatch(setCurrentTicketDetails({
                    ...currentTicketDetails,
                    [name]: value,
                }))
            }
        })
    }


    const handleCreateTicket = () => {
        let data = {...currentTicketDetails};
        if (data._id === '') delete data._id; // remove the id if it's empty, and let the backend processing do its thing (when creating a new ticket)
        const isEmptyProperty = Object.values(data).some(value => (value === ''));

        // if date is not valid
        if (data.date === '') {
            alert("Vui lòng nhập đúng định dạng ngày (vd: 17-05-2023)");
            console.log("data: " + data.date);
            return;
        }

        // if time is not valid
        if (data.departure_time === '' || data.arrival_time === '') {
            alert("Vui lòng nhập đúng định dạng giờ của chuyến đi (vd: 5:30-7:30)");
            return;
        }

        // if price is not valid
        if (!/^(?!0+$)\d+(?:\.\d+)?$/.test(data.price.toString())) {
            alert("Giá tiền phải là số dương không âm và không chứa kí tự đặc biệt.");
            return;
        }

        //if data has any properties which have empty value
        if (isEmptyProperty) { 
            alert("Thông tin trong form không được bỏ trống.");
            return;
        }

        // if data is valid
        axios.post(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/create-ticket`, data).then((res) => {
            dispatch(setCurrentTicketDetails({}));
            dispatch(addNewTicket(res.data.ticketCreated));
            alert('Vé đã được tạo thành công!');
            navigate("/admin/manage-ticket/ticket");
            setIsCRUDTicket(false);
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleUpdateTicket = () => {
        let data = {...currentTicketDetails};
        const isEmptyProperty = Object.values(data).some(value => (value === ''));
        // if date is not valid
        if (data.date === '') {
            alert("Vui lòng nhập đúng định dạng ngày (vd: 17-05-2023)");
            console.log("data: " + data.date);
            return;
        }

        // if time is not valid
        if (data.departure_time === '' || data.arrival_time === '') {
            alert("Vui lòng nhập đúng định dạng giờ của chuyến đi (vd: 5:30-7:30)");
            return;
        }

        // if price is not valid
        if (!/^(?!0+$)\d+(?:\.\d+)?$/.test(data.price.toString())) {
            alert("Giá tiền phải là số dương không âm và không chứa kí tự đặc biệt.");
            return;
        }

        //if data has any properties which have empty value
        if (isEmptyProperty) { 
            alert("Vui lòng điền đầy đủ thông tin trong form.");
            return;
        }
        // if the data is valid
        axios.put(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/update-ticket/${data._id}`, data).then((res) => {
            if (res.data.status === "success") {
                dispatch(updateTicket(res.data.updatedTicket));
                alert("Cập nhật thành công");
                navigate("/admin/manage-ticket/ticket");
                dispatch(setCurrentTicketDetails({}));
                setIsCRUDTicket(false);
            }
        }).catch((err) => {
            console.log(err);
        }) ;
    }


    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/get-locations`);
            setLocations(res.data.locations);
            res = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/get-stations`);
            setStations(res.data.stations);
            res = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/get-trips`);
            setTrips(res.data.trips);
        }
        fetchData();
    }, [])


    return  <>
        <div className={styles["wrapper"]}>
        {/* search bar */}
        <Searching onCRUDTicket = {() => {
            setIsCRUDTicket(true)}
            }/>
        {/* choose the place */}
        <div className={styles["place-choosing"]}>
            <div className={styles["from-HCM"]} onClick = {handleFirstPlaceChoosingClick}>
                <PlaceChoosing where = "from_TP.HCM" locations = {locations} text = "Đi từ TP.HCM đến" isActive = {placeChoosing.fromHCM ? true : false}/>
            </div>
            <div className={styles["to-HCM"]} onClick = {handleSecondPlaceChoosingClick} >
                <PlaceChoosing where = "to_TP.HCM" locations = {locations} text = "Đi đến TP.HCM từ" isActive = {placeChoosing.toHCM ? true : false}/>
            </div>
        </div>
        {/* tickets table */}
        <TableView onCRUDTicket = {() => {
            setIsCRUDTicket(true)}
            }/>
    </div>
    {IsCRUDTicket &&  <div className={styles["ticket-managing"]}>
        <div className={styles["overlay"]}  onClick = {cancelCRUDTicket}></div>
        <div className={styles["crud-ticket-form"]}>
            {currentTicketDetails._id === '' ? <div className={styles["title"]}>Tạo vé</div> : <div className={styles["title"]}>Thông tin vé</div>}
            <div className={styles["ticket-details"]}>
                <div className = {styles["form"]}>
                    <div className={styles["first-row"]}>
                        <select name="departure_city" onChange = {handleSelectChange} id="" className = {styles["departure-cỉty"]}>
                            {currentTicketDetails._id === '' ?  <option value="" disabled selected>Điểm đi</option> :  <option value={currentTicketDetails.departure_city} disabled selected>{currentTicketDetails.departure_city}</option>}
                            {locations.length > 0 && currentTicketDetails._id === '' ? locations.map((el, index) => <option key = {el.id} value = {el.location}>{el.location}</option>) : null }
                        </select>
                        <span className={styles["to-icon"]}><ToIcon/></span>
                        <select name="arrival_city" onChange = {handleSelectChange} id="" className = {styles["arrival-cỉty"]}>
                            {currentTicketDetails._id === '' ?  <option value="" disabled selected>Điểm đến</option> :  <option value={currentTicketDetails.arrival_city} disabled selected>{currentTicketDetails.arrival_city}</option>}
                            {locations.length > 0 && currentTicketDetails._id === '' ? locations.map((el, index) => <option key = {el.id} value = {el.location}>{el.location}</option>) : null }
                        </select>   
                        <div className={styles["date-time"]}>
                            <input name = "date" onChange = {handleInputChange} type="text" className = {styles["date"]} placeholder={currentTicketDetails.date ? `${currentTicketDetails.date.slice(0,10)}` : "yyyy-mm-dd"}/>
                            <input name = "time" onChange = {handleInputChange} type="text" className = {styles["hour"]} placeholder={currentTicketDetails.departure_time ? `${currentTicketDetails.departure_time}-${currentTicketDetails.arrival_time}` : "start-end time"}/>
                        </div>
                    </div>
                    <div className={styles["second-row"]}>
                        <select name="departure_depot" onChange = {handleSelectChange} id="" className = {styles["departure-depot"]}>
                                {/* <option value="" disabled selected>Điểm lên xe</option> */}
                                {currentTicketDetails._id === '' ?  <option value="" disabled selected>Điểm lên xe</option> :  <option value={currentTicketDetails.departure_depot} disabled selected>{currentTicketDetails.departure_depot}</option>}
                                {stations.length > 0 ? 
                                stations.find((el) => el.location === selectedChange.departure_city || el.location === currentTicketDetails.departure_city)?.stations
                                .map((station) => <option key = {station.name} value = {station.name}>
                                    {station.name}
                                </option>) : null}
                        </select>
                        <select name="arrival_depot" onChange = {handleSelectChange} id="" className = {styles["arrival-depot"]}>
                            {/* <option value="" disabled selected>Điểm xuống xe</option> */}
                            {currentTicketDetails._id === '' ?  <option value="" disabled selected>Điểm xuống xe</option> :  <option value={currentTicketDetails.arrival_depot} disabled selected>{currentTicketDetails.arrival_depot}</option>}
                            {stations.length > 0 ? 
                                stations.find((el) => el.location === selectedChange.arrival_city || el.location === currentTicketDetails.arrival_city)?.stations
                                .map((station) => <option key = {station.name} value = {station.name}>
                                    {station.name}
                                </option>) : null}
                        </select>
                        <select name="bus_type" onChange = {handleSelectChange} id="" className = {styles["bus-type"]}>
                            {/* <option value="" disabled selected>Loại xe</option> */}
                            {currentTicketDetails._id === '' ?  <option value="" disabled selected>Loại xe</option> :  <option value={currentTicketDetails.bus_type} disabled selected>{currentTicketDetails.bus_type}</option>}
                            <option value="Ghế">Ghế</option>
                            <option value="Giường">Giường</option>
                            <option value="Limousine">Limousine</option>
                        </select>
                    </div>
                    <div className={styles["third-row"]}>
                        <input type="text" name = "price" onChange = {handleInputChange} className={styles["ticket-price"]} placeholder= {currentTicketDetails.price ? `${String(currentTicketDetails.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}` : "Giá vé (vnđ)"} />
                    </div>
                </div>
            </div>
            <div className={styles["create-btn"]}>
                {currentTicketDetails._id !== '' ? <CreateButton action = "update" onUpdateTicket = {handleUpdateTicket}/>
                 : <CreateButton action = "create" onCreateTicket = {handleCreateTicket}/>} 
            </div>
        </div>
      
    </div>}
    </>
    
}

export default ManageTicketPage;