import styles from "./Overlay.module.css"

const Overlay = (props) => {
    return <div className={styles["overlay"]} onClick = {props.onCloseOverlay}>
    </div>
}


export default Overlay;