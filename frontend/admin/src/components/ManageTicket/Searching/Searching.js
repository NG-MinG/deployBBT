import styles from "./Searching.module.css";
import { ReactComponent as MagnifyingGlassIcon } from "../../../assets/svg/ManageTicket/magnifying_glass.svg";
import CreateButton from "../../CreateButton/CreateButton";
import axios from "axios";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { deleteTicket, getTicketUpdating, setTickets } from "../../../store/reducers/ticketManagingSlice";


const Searching = (props) => {
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.ticketManaging.tickets);
    const [inputChange, setInputChange] = useState('');

    const handleInputChange = (event) => {
        setInputChange(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/search-ticket/?q=${inputChange}`).then((res) => {
            dispatch(setTickets(res.data.tickets));
        })
    }

    return <div className = {styles["wrapper"]}>
        <form action="" className = {styles["searching-form"]} onSubmit = {handleSearch} >
            <button type = "submit" className={styles["searching-btn"]}><MagnifyingGlassIcon/></button> 
            <input value = {inputChange} onChange = {handleInputChange} type="text" className = {styles["search-input"]} placeholder="Tìm kiếm"/>
        </form>
        <CreateButton action = "create" onCreateTicket = {props.onCRUDTicket}/>
    </div>
}
export default Searching;
