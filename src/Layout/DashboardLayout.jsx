import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardComponent/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex ">
            <Helmet>
            <title> Hope In Drops | Dashboard</title>
            </Helmet>
        <div>
            <Sidebar></Sidebar>
        </div>
        <div className="flex-1 md:ml-64">
            <div className="">
            <Outlet></Outlet>
            </div>
        </div>
    </div>

    );
};

export default DashboardLayout;