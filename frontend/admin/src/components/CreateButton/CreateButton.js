import styles from "./CreateButton.module.css";
import { ReactComponent as CreateIcon } from "../../assets/svg/ManageTicket/plus.svg";

const CreateButton = (props) => {
    return (
    <button className={styles["create-btn"]} onClick = {props.action === "create" ? props.onCreateTicket : props.onUpdateTicket}>
            <div className={styles["content"]}>
                {props.action === "create" &&  
                 <>
                    <span className={styles["text"]}>Tạo vé</span>
                    <span className={styles["icon"]}><CreateIcon/></span>
                 </>
                }
                {props.action === "update" && <span className={styles["text"]}>Cập nhật</span>
                }
               
            </div>
    </button>
    ) 
}

export default CreateButton;
