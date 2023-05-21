import { Routes, Route } from "react-router-dom";
import TicketBookingPage from "../pages/TicketBookingPage/TicketBookingPage";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage"
import Information from '../components/UserProfile/Information/Information'
import EditInformation from '../components/UserProfile/EditInformation/EditInformation'
import ChangePassword from '../components/UserProfile/ChangePassword/ChangePassword'
import MyTicket from '../components/UserProfile/MyTicket/MyTicket'
import SchedulePage from '../pages/SchedulePage/SchedulePage'
import BranchesPage from "../pages/BranchesPage/BranchesPage";
import ContactPage from "../pages/ContactPage/ContactPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<BaseLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/ticket-booking" element={<TicketBookingPage />} />
                <Route path="/user-profile" element={<UserProfilePage />}>
                    <Route index element={<Information />} />
                    <Route path='edit-information' element={<EditInformation />} />
                    <Route path='change-password' element={<ChangePassword />} />
                    <Route path='my-ticket' element={<MyTicket />} />
                </Route>
                <Route path="/schedules" element={<SchedulePage />} ></Route>
                <Route path="/branches" element={<BranchesPage />} ></Route>
                <Route path="/contact" element={<ContactPage />} ></Route>
            </Route>
        </Routes>)
}

export default AppRoutes;   