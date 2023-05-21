import styles from "./PlaceChoosing.module.css";
import {ReactComponent as StatusIcon} from "../../../assets/svg/ManageTicket/grey_round.svg";
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import {setTickets} from "../../../store/reducers/ticketManagingSlice.js";
import axios from "axios";


const PlaceChoosing = (props) => {
    const dispatch = useDispatch();
    const handleSelectChange = (event) => {
        if (props.where === "from_TP.HCM") {
            axios.get(`${process.env.REACT_APP_API_HOST}/tickets/get-tickets/?departure_city=TP.Hồ Chí Minh&arrival_city=${event.target.value}`)
            .then((res) => {
            dispatch(setTickets([...res.data.tickets]))
        }).catch((err) => console.error(err));
        }
        else if (props.where === "to_TP.HCM") {
            axios.get(`${process.env.REACT_APP_API_HOST}/tickets/get-tickets/?departure_city=${event.target.value}&arrival_city=TP.Hồ Chí Minh`)
            .then((res) => {
                dispatch(setTickets([...res.data.tickets]))
            }).catch((err) => console.error(err));
        }
    }   

    return <div className={`${styles["wrapper"]} ${props.isActive && styles["active-border"]}`}>
        <span className={styles["status-icon"]}><StatusIcon style = {{fill: props.isActive ? "#46A7ED": "#E0E0E0"}}/></span>
        <span className={`${styles["text"]} ${props.isActive && styles["active-text"]}`}>{props.text}</span>
        <select name="place-chosen" className={styles["choose-place"]} onChange = {handleSelectChange}>
            <option value="" disabled selected>Chọn vị trí</option>
            {props.locations.length > 0 ? props.locations.map((el, index) => {
                    if (el.location !== "TP.Hồ Chí Minh") {
                        return  <option key = {el.id} value = {el.location}>
                    {el.location} </option>
                    }
                }) : null }
        </select>
    </div>
}


export default PlaceChoosing;