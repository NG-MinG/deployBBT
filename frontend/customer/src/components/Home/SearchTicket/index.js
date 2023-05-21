import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import classes from "./SearchTicket.module.css";
import RadioButton from "../../RadioButton";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as SearchIcon } from "../../../assets/svg/SearchForm/search.svg";
import TimePicker from "../../TimePicker";

const SearchTicket = () => {
    // const list_location_suggest = [
    //     "An Giang (CHAUDOC)",
    //     "An Giang (LONGXUYEN)",
    //     "Bạc Liêu (BACLIEU)",
    //     "Bến Tre (BENTRE)",
    //     "Cà Mau (CAMAU)",
    //     "Cần Thơ (CANTHO)",
    //     "Cao Lãnh (CAOLANH)",
    //     "Đồng Tháp (DONGTHAP)",
    //     "Hà Tiên (HATIEN)",
    //     "Kiên Giang (KIENGIANG)",
    //     "Rạch Giá (RACHGIA)",
    //     "TP. Hồ Chí Minh (TPHCM)",
    //     "Trà Vinh (TRAVINH)",
    //     "Vũng Tàu (VUNGTAU)",
    // ];

    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [suggess_active, setSuggessActive] = useState(false);
    const [list_location_suggest, setLocationSuggest] = useState([]);
    const list_location = useRef();

    const ticketForm = useRef();

    const navigate = useNavigate();

    const dispatcher = useRef(() => {});

    const dispatcher_departure = (value) => {
        setDeparture(value);
        setLocationSuggest(prev => prev.filter(el => el !== departure))
        // setSuggessActive(false);
    };

    const dispatcher_arrival = (value) => {
        setArrival(value);
        setLocationSuggest(prev => prev.filter(el => el !== arrival))

        // setSuggessActive(false);
    };

    const swap_location = (departure, arrival) => {
        setDeparture(arrival);
        setArrival(departure);
    };

    useEffect(() => {
        dispatcher.current = dispatcher_arrival;
    }, [arrival]);

    useEffect(() => {
        dispatcher.current = dispatcher_departure;
    }, [departure]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_ipAddress + "/bus/api/v1/schedule/schedules")
            .then((res) => {

                const departure_data = Array.from(new Set(res.data.data.schedules.map(el => el.departure_city.replace('. ', '.'))));
                const arrival_data = Array.from(new Set(res.data.data.schedules.map(el => el.arrival_city.replace('. ', '.'))));
                
                list_location.current = Array.from(new Set([...departure_data, ...arrival_data]));

                setLocationSuggest(list_location.current);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const departureCity = ticketForm.current.departure_city.value;
        const arrivalCity = ticketForm.current.arrival_city.value;
        const date = ticketForm.current.departure_date.value;

        if (new Date(date) < new Date(`${new Date().toISOString().split('T')[0]}T00:00:00.000Z`)) {
            return alert('Ngày đi không hợp lệ');
        }

        const ticketType = ticketForm.current.ticket_type.value;
        navigate(
            `/ticket-booking?departure_city=${departureCity}&arrival_city=${arrivalCity}&date=${date}&ticket_type=${ticketType}`
        );
    };

    return (
        <form
            ref={ticketForm}
            onSubmit={handleSearch}
            className={classes.search_form}
            autoComplete="off"
        >
            <div className={classes.radio_group}>
                <RadioButton
                    name="ticket_type"
                    defaultChecked
                    value="1"
                    text="Một chiều"
                />
                <RadioButton name="ticket_type" value="2d" text="Khứ hồi" />
            </div>
            <div className={classes.trip_group}>
                <div className={classes.location_group}>
                    <div className={classes.departure_location}>
                        <div className={classes.choose_title}>Điểm đi</div>
                        <div className={classes.dropdown}>
                            <input
                                name="departure_city"
                                type="text"
                                className={classes.drop_input}
                                placeholder="Chọn điểm đi"
                                onBlur={() => {
                                    setTimeout(() => {
                                        setSuggessActive(false);
                                    }, 150);
                                }}
                                onFocus={() => {
                                    dispatcher.current = dispatcher_departure;
                                    
                                    if (arrival !== "TP.Hồ Chí Minh") {
                                        if (!list_location.current.includes(arrival))
                                            setLocationSuggest(list_location.current);
                                        else 
                                            setLocationSuggest(['TP.Hồ Chí Minh']);
                                    }
                                    else 
                                        setLocationSuggest(list_location.current.filter(el => el !== arrival));

                                    setTimeout(() => {
                                        setSuggessActive(true);
                                    }, 160);
                                }}
                                onChange={(e) => { 
                                        const departureValue = e.target.value;
                                        setDeparture(departureValue);
                                        setLocationSuggest(list_location.current.filter(el => el.toLowerCase().indexOf(departureValue.toLowerCase()) > -1));
                                    }
                                }
                                value={departure}
                            />
                        </div>
                    </div>
                    <div
                        className={classes.swap_icon}
                        onClick={() => swap_location(departure, arrival)}
                    >
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    </div>
                    <div className={classes.arrival_location}>
                        <div className={classes.choose_title}>Điểm đến</div>
                        <div className={classes.dropdown}>
                            <input
                                name="arrival_city"
                                type="text"
                                className={classes.drop_input}
                                placeholder="Chọn điểm đến"
                                onBlur={() => {
                                    setTimeout(() => {
                                        setSuggessActive(false);
                                    }, 150);
                                }}
                                onFocus={() => {
                                    dispatcher.current = dispatcher_arrival;

                                    if (departure !== "TP.Hồ Chí Minh") {
                                        if (!list_location.current.includes(departure))
                                            setLocationSuggest(list_location.current);
                                        else 
                                            setLocationSuggest(['TP.Hồ Chí Minh']);
                                    }
                                    else 
                                        setLocationSuggest(list_location.current.filter(el => el !== departure));

                                    setTimeout(() => {
                                        setSuggessActive(true);
                                    }, 160);
                                }}
                                onChange={
                                    (e) => {
                                        const arrivalValue = e.target.value;
                                        setArrival(arrivalValue);

                                        setLocationSuggest(list_location.current.filter(el => el.toLowerCase().indexOf(arrivalValue.toLowerCase()) > -1));
                                    }
                                }
                                value={arrival}
                            />
                        </div>
                    </div>
                    {suggess_active && (
                        <div className={classes.suggest_dropdown}>
                            {suggess_active &&
                                list_location_suggest.map((item, index) => (
                                    <div
                                        key={`${item}_${index}`}
                                        onClick={() =>
                                            dispatcher.current(
                                                item.split(" (")[0]
                                            )
                                        }
                                        className={classes.suggest_item}
                                    >
                                        {item}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div className={classes.time_group}>
                    <div className={classes.time_group_child}>
                        <div className={classes.departure_time}>
                            <div className={classes.choose_title}>Ngày đi</div>
                            <div className={classes.time_choosen}>
                                <TimePicker required name="departure_date" />
                            </div>
                        </div>
                        <div className={classes.line_spec}></div>
                        <div className={classes.arrival_time}>
                            <div className={classes.choose_title}>Ngày về</div>
                            <div className={classes.time_choosen}>
                                <TimePicker name="arrival_date" disable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.controls}>
                <Button type="submit" className={classes.search_btn}>
                    <SearchIcon />
                    <span>Tìm chuyến xe</span>
                </Button>
            </div>
        </form>
    );
};

export default SearchTicket;
