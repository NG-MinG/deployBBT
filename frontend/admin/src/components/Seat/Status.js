import styles from "./Status.module.css"
import {ReactComponent as StatusIcon} from "../../assets/svg/ManageTicket/rect.svg";


const Status = (props) => {
    return <StatusIcon style =  {{fill: props.color}}/>
}

export default Status;