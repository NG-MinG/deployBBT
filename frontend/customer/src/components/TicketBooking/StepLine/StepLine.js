import styles from "./StepLine.module.css";

const StepLine = (props) => {
    const originalDate = props.date;
    const date_parts = originalDate.split('-');
    const formattedDate = `${date_parts[2]}-${date_parts[1]}-${date_parts[0]}`

    return(
    <>
    {/* {(props.currentStep === "stepOne" || props.currentStep === "stepTwo")
    && 
        <>
        
        </>
    } */}
    <div className = {styles["route-title"]}>{`${props.departure_city.toUpperCase()} - ${props.arrival_city.toUpperCase()}`}</div>
        <div className = {styles["date"]}>{formattedDate}</div>
        <div className = {styles["step-line-container"]}>
            <div className =  {styles["step-block"]}>
                <div className={`${styles["title"]} ${styles["active-title"]}`}>Chọn tuyến</div>
                <div className = {styles["current-step"]}>
                    <div className={styles.text}>1</div>
                    {/* <div className={styles["current-line"]}></div> */}
                </div>
            </div>
            <div className =  {styles["step-block"]}>
                <div className={`${styles["title"]} ${styles["active-title"]}`}>Xác nhận lộ trình</div>
                {/* <div className = {styles["next-step"]}>
                    <div className={styles.text}>2</div>
                </div> */}
                {(props.currentStep === "stepOne" || props.currentStep === "stepTwo") &&
                <div className = {styles["next-step"]}>
                    <div className={styles.text}>2</div>
                </div>
                }
                {(props.currentStep === "stepThree" || props.currentStep === "stepFour")  &&
                <div className = {styles["current-step"]}>
                    <div className={styles.text}>2</div>
                </div>
                }
            </div>
            <div className =  {styles["step-block"]}>
                <div className={(props.currentStep === "stepThree" || props.currentStep === "stepFour") ? `${styles["title"]} ${styles["active-title"]}` : `${styles["title"]} ${styles["inactive-title"]}`}>Thông tin hành khách</div>
                {/* <div className = {styles["empty-step"]}>
                    <div className={styles.text}>3</div>
                </div> */}
                {(props.currentStep === "stepOne" || props.currentStep === "stepTwo") &&
                    <div className = {styles["empty-step"]}>
                        <div className={styles.text}>3</div>
                    </div>
                }
                {(props.currentStep === "stepThree") &&
                <div className = {styles["next-step"]}>
                    <div className={styles.text}>3</div>
                </div>
                }
                {props.currentStep === "stepFour"  &&
                <div className = {styles["current-step"]}>
                    <div className={styles.text}>3</div>
                </div>
                }
            </div>
            <div className =  {styles["step-block"]}>
                <div className={props.currentStep === "stepFour" ? `${styles["title"]} ${styles["active-title"]}` : `${styles["title"]} ${styles["inactive-title"]}`}>Thanh toán</div>
                {/* <div className = {styles["empty-step"]}>
                    <div className={styles.text}>4</div>
                </div> */}
                {(props.currentStep === "stepOne" || props.currentStep === "stepTwo" || props.currentStep === "stepThree") &&
                    <div className = {styles["empty-step"]}>
                        <div className={styles.text}>4</div>
                    </div>
                }
                {(props.currentStep === "stepFour") &&
                <div className = {styles["next-step"]}>
                    <div className={styles.text}>4</div>
                </div>
                }
            </div>
            <div className={styles["current-line"]}></div>
            <div className={(props.currentStep === "stepThree" || props.currentStep === "stepFour") ? `${styles["current-line-2"]}` : styles["empty-line-1"] }></div>
            <div className={props.currentStep === "stepFour" ? styles["current-line-3"] : styles["empty-line-2"]}></div>
        </div>
   
    </>
    ) 
}
export default StepLine;

