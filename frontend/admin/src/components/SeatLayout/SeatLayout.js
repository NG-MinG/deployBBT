import styles from "./SeatLayout.module.css";
import Seat from "../Seat/Seat";
import Status from "../Seat/Status.js";

const SeatLayout = () => {
    return <div className={styles["layout-seat"]}>
    <div className={styles["layout-seat-title"]}>
        <div className={styles["below"]}>Tầng dưới</div>
        <div className={styles["above"]}>Tầng trên</div>
    </div>
    <div className={styles["seat-tables"]}>
        <div className={styles["seat-table-container"]}>
            <table className={styles["seat-table"]}>
                <tbody>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A01"/></td>
                        <td className = {styles["empty-seat-space"]}><Seat color = "#737B83"/></td>
                        <td><Seat color = "#737B83" seatID = "A02"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A03"/></td>
                        <td><Seat color = "#737B83" seatID = "A04"/></td>
                        <td><Seat color = "#737B83" seatID = "A05"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A06"/></td>
                        <td><Seat color = "#737B83" seatID = "A07"/></td>
                        <td><Seat color = "#737B83" seatID = "A08"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A09"/></td>
                        <td><Seat color = "#737B83" seatID = "A10"/></td>
                        <td><Seat color = "#737B83" seatID = "A11"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A12"/></td>
                        <td><Seat color = "#737B83" seatID = "A13"/></td>
                        <td><Seat color = "#737B83" seatID = "A14"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "A15"/></td>
                        <td><Seat color = "#737B83" seatID = "A16"/></td>
                        <td><Seat color = "#737B83" seatID = "A17"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className={styles["seat-table-container"]}>
        <table className={styles["seat-table"]}>
                <tbody>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B01"/></td>
                        <td className = {styles["empty-seat-space"]}><Seat color = "#737B83"/></td>
                        <td><Seat color = "#737B83" seatID = "B02"/></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B03" /></td>
                        <td><Seat color = "#737B83" seatID = "B04" /></td>
                        <td><Seat color = "#737B83" seatID = "B05" /></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B06" /></td>
                        <td><Seat color = "#737B83" seatID = "B07" /></td>
                        <td><Seat color = "#737B83" seatID = "B08" /></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B09" /></td>
                        <td><Seat color = "#737B83" seatID = "B10" /></td>
                        <td><Seat color = "#737B83" seatID = "B11" /></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B12" /></td>
                        <td><Seat color = "#737B83" seatID = "B13" /></td>
                        <td><Seat color = "#737B83" seatID = "B14" /></td>
                    </tr>
                    <tr>
                        <td><Seat color = "#737B83" seatID = "B15" /></td>
                        <td><Seat color = "#737B83" seatID = "B16" /></td>
                        <td><Seat color = "#737B83" seatID = "B17" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    {/* <div className={styles["notes"]}>
        <div className={styles["status"]}>
            <span className={styles["color-indicate"]}><Status color = "#C0C6CC"/></span>
            <span className={styles["description"]} style = {{color: "#737B83", fontWeight: 500}}>Trống</span>
        </div>
        <div className={styles["status"]}>
            <span className={styles["color-indicate"]}><Status color =  "#417DD8"/></span>
            <span className={styles["description"]} style = {{color: "#417DD8", fontWeight: 500}}>Đang chọn</span>
        </div>
        <div className={styles["status"]}>
            <span className={styles["color-indicate"]}><Status color = "#FF0000"/></span>
            <span className={styles["description"]} style = {{color: "#FF0000", fontWeight: 500}}>Đã đặt</span>
        </div>
    </div> */}
</div>
}

export default SeatLayout;
