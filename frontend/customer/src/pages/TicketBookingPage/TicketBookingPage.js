import {useEffect, useState} from "react"
    import { useSearchParams } from "react-router-dom"
import ChooseRoute from "../../components/TicketBooking/ChooseRoute/ChooseRoute"
import ConfirmRoute from "../../components/TicketBooking/ConfirmRoute/ConfirmRoute"
import GuestInfo from "../../components/TicketBooking/GuestInfo/GuestInfo"
import Payment from "../../components/TicketBooking/Payment/Payment"


const TicketBookingPage = () => {
    const [searchParams] = useSearchParams();
    const departure_city = searchParams.get('departure_city');
    const arrival_city = searchParams.get('arrival_city');
    const date = searchParams.get('date');
    const [process, setProcess] = useState({
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false
    })
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [process])

    const setStep = (newState) => {
        setProcess(pre => ({
            ...pre,
            ...newState
        }))
        // setProcess(pre => {
        //     console.log("currentState: ", pre);
        //     console.log("new State: ", newState);
        //     return {
        //         ...pre,
        //         ...newState,
        //     }
        // })
    }

    return (<>
    {process.stepOne && (<ChooseRoute departure_city = {departure_city} arrival_city = {arrival_city} date = {date} currentStep = "stepOne" onSetStep = {setStep}/>)}
    {process.stepTwo && (<ConfirmRoute departure_city = {departure_city} arrival_city = {arrival_city} date = {date} currentStep = "stepTwo" onSetStep = {setStep}/>)}
    {process.stepThree && (<GuestInfo departure_city = {departure_city} arrival_city = {arrival_city} date = {date} currentStep = "stepThree" onSetStep ={setStep}/>)}
    {process.stepFour && (<Payment departure_city = {departure_city} arrival_city = {arrival_city} date = {date} currentStep = "stepFour" onSetStep ={setStep}/>)}
    </>)
}

export default TicketBookingPage;