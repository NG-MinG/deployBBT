import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AccountUserPage from "../pages/AccountUserPage/AccountUserPage";
import BusStationPage from "../pages/BusStationPage/BusStationPage";
import BusRoutePage from "../pages/BusRoutePage/BusRoutePage";
import ManageTicketPage from "../pages/ManageTicketPage/ManageTicketPage";
import ManageTicketOrderPage from "../pages/ManageTicketOrderPage/ManageTicketOrderPage";
import ManageTicketOrderEditPage from "../pages/ManageTicketOrderPage/ManageTicketOrderEditPage/ManageTicketOrderEditPage";
import ManageTicketPageDetail from "../pages/ManageTicketPage/Details/ManageTicketPageDetail";
import { auth } from '../utils/storage';
import Login from "../pages/Login/Login";

const AppRoutes = () => {
    const isLogin = auth.isLogin();
    if (isLogin) {
        return (
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="account" element={<AccountUserPage />} />
                    <Route path="bus-station" element={<BusStationPage />} />
                    <Route path="bus-route" element={<BusRoutePage />} />
                    <Route path="manage-ticket" element={<ManageTicketPage />} />
                    <Route path="manage-ticket/ticket" element={<ManageTicketPage />} />
                    <Route path="manage-ticket/ticket/details/:id" element={<ManageTicketPageDetail />} />
                    <Route path="manage-ticket/ticket-order" element={<ManageTicketOrderPage />} />
                    <Route path="manage-ticket/ticket-order/edit/:id" element={<ManageTicketOrderEditPage />} />
                    <Route path="*" element={<Navigate to='/admin/dashboard' />} />
                </Route>
                <Route path="*" element={<Navigate to='/admin/dashboard' />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="*" element={<Navigate to='/admin/login' />} />
            </Routes>
        )
    }
}

export default AppRoutes;   