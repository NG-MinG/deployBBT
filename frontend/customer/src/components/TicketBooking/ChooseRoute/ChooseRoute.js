import styles from "./ChooseRoute.module.css"
import Ticket from "../../Ticket/Ticket";
import {useState, useEffect, useRef} from "react";
import { useSearchParams } from "react-router-dom"
import axios from "axios";
import StepLine from "../StepLine/StepLine";


const ChooseRoute = (props) => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [startingDepots, setStartingDepots] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedBusType, setSelectedBusType] = useState('');


    let originalTickets = useRef([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/tickets/get-tickets/?departure_city=${props.departure_city}&arrival_city=${props.arrival_city}&date=${props.date}`)
        .then((res) => {
            originalTickets.current = [...res.data.tickets];
            setTickets(originalTickets.current.map((el, index) => {
                    const ticketPreProcessed = {
                        ...el,
                        price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(el.price).replace(/\s/g, ' '),
                        distance: `${Math.floor(el.distance/1000)} km`,
                        travel_time: `${Math.floor(el.travel_time/3600)} tiếng`
                    }
                    originalTickets.current[index] = ticketPreProcessed;
                    return ticketPreProcessed;
                }
            ))
            setStartingDepots([...res.data.starting_depots.stations]);
            setIsLoading(false);
        }).catch((err) => console.log(err));
    }, [])

    const [chosenTicket, setChosenTicket] = useState({});
    const chooseTicket = (id) => {
        setChosenTicket(id);
    }
    
    // filter based on hours
    const handleTimeSelectChange = (e) => {
        let ticketsFiltered = [...originalTickets.current];
        if (e.target.value !== "Giờ") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return parseInt(el.departure_time.split(":")[0]) >= parseInt(e.target.value.split("-")[0]) 
                && parseInt(el.departure_time.split(":")[0]) <= parseInt(e.target.value.split("-")[1]);
            })
            ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.departure_time.split(":")[0]) - parseInt(b.departure_time.split(":")[0]));
        }
        if (selectedPrice && selectedPrice !== "Giá") {
            if (selectedPrice === "LowToHigh") {
             ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.price.replace(/\.|\s/g, '')) - parseInt(b.price.replace(/\.|\s/g, '')));
            } else if (selectedPrice === "HighToLow") { 
             ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(b.price.replace(/\.|\s/g, '')) - parseInt(a.price.replace(/\.|\s/g, '')));
            }
        } 
        if (selectedBusType && selectedBusType !== "Loại xe") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return el.bus_type === selectedBusType;
            })
        }
        setTickets(ticketsFiltered);
        setSelectedTimeRange(e.target.value);
    }

    // sort based on price
    const handlePriceChange = (e) => {
        let ticketsFiltered = [...originalTickets.current];
        if (e.target.value !== "Giá") {
            if (e.target.value === "LowToHigh") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.price.replace(/\.|\s/g, '')) - parseInt(b.price.replace(/\.|\s/g, '')));
            }
            else if (e.target.value === "HighToLow") {
                ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(b.price.replace(/\.|\s/g, '')) - parseInt(a.price.replace(/\.|\s/g, '')));
            }
        }
        if (selectedTimeRange && selectedTimeRange !== "Giờ") {
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
        setTickets(ticketsFiltered);
        setSelectedPrice(e.target.value);
    }

    // filter based on bus type
    const handleBusTypeChange = (e) => {
        let ticketsFiltered = [...originalTickets.current];
        if (e.target.value !== "Loại xe") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return el.bus_type === e.target.value;
            })
        }
        if (selectedPrice && selectedPrice !== "Giá") {
            if (selectedPrice === "LowToHigh") {
             ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.price.replace(/\.|\s/g, '')) - parseInt(b.price.replace(/\.|\s/g, '')));
            } else if (selectedPrice === "HighToLow") { 
             ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(b.price.replace(/\.|\s/g, '')) - parseInt(a.price.replace(/\.|\s/g, '')));
            }
        } 
        if (selectedTimeRange && selectedTimeRange !== "Giờ") {
            ticketsFiltered = ticketsFiltered.filter((el) => {
                return parseInt(el.departure_time.split(":")[0]) >= parseInt(selectedTimeRange.split("-")[0]) 
                && parseInt(el.departure_time.split(":")[0]) <= parseInt(selectedTimeRange.split("-")[1]);
            })
            ticketsFiltered = ticketsFiltered.sort((a,b) => parseInt(a.departure_time.split(":")[0]) - parseInt(b.departure_time.split(":")[0]));
        }
        setTickets(ticketsFiltered);
        setSelectedBusType(e.target.value);
    }

  
    return <>
        <div className = {styles["main-content"]}>
            <StepLine departure_city = {props.departure_city} arrival_city = {props.arrival_city} date = {props.date} currentStep = {props.currentStep}/>
            <div className={styles["reminder"]}>Vui lòng chọn giờ lên xe phù hợp</div>
            <div className={styles["Filter"]}>
                <select value = {selectedPrice} name="PriceFilter" id="" onChange = {handlePriceChange} className = {styles.priceFilter}>
                    <option value="Giá" disable selected>Giá</option>
                    <option value="LowToHigh">Thấp - Cao</option>
                    <option value="HighToLow">Cao - Thấp</option>
                </select>
                <select value = {selectedBusType} onChange = {handleBusTypeChange} name="CarTypeFilter" id="" >
                    <option value="Loại xe" disable selected>Loại xe</option>
                    <option value="Ghế">Ghế</option>
                    <option value="Giường">Giường</option>
                    <option value="Limousine">Limousine</option>
                </select>
                <select value = {selectedTimeRange} onChange = {handleTimeSelectChange} name="HoursFilter" id="">
                    <option value="Giờ" disable selected>Giờ</option>
                    <option value="0-6">0h-6h</option>
                    <option value="6-12">6h-12h</option>
                    <option value="12-18">12h-18h</option>
                    <option value="18-24">18h-24h</option>
                </select>
            </div>
            {
                tickets.length > 0  ? tickets.map((el, id) => {
                    return <Ticket ticketDetails = {el} startingDepots = {startingDepots} dropDown = {chosenTicket === el.id} onChooseTicket = {chooseTicket} onSetStep = {props.onSetStep}/>
                }) : null
            }
            {
                tickets.length === 0 && <div style = {{margin: "0 auto", marginTop: "2rem", borderRadius: "8px", backgroundColor: "#e7f5ff", padding: "1rem", textAlign: "center", width: "40%"}}>
                <span style = {{fontSize: "1.75rem", color: "#417DD8", fontWeight: "500"}}>
                 Không tìm thấy thông tin chuyến!
                </span>
                </div>
            }
        </div>
    </> 
}   


export default ChooseRoute;
