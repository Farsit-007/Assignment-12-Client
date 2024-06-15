import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../DashboardComponent/Profile/Profile";
import DonorCreateReq from "../DashboardComponent/DonorElements/DonorCreateReq";
import MyReqDon from "../DashboardComponent/DonorElements/MyReqDon/MyReqDon";
import Dashboard from "../DashboardComponent/DonorElements/DashBoard/Dashboard";
import ReqDonationDetails from "../DashboardComponent/DonorElements/ReqDonationDetails/ReqDonationDetails";
import ReqUpdate from "../DashboardComponent/DonorElements/ReqUpdate/ReqUpdate";
import Donationreq from "../Pages/DonationRequest/Donationreq";
import DonationDetails from "../Pages/DonationRequest/DonationDetails";
import AllUser from "../DashboardComponent/DonorElements/AdminDashboard/AllUser";
import AllBloodDonationreq from "../DashboardComponent/DonorElements/AdminDashboard/AllBloodDonationreq";
import AdminContent from "../DashboardComponent/DonorElements/AdminDashboard/AdminContent";
import AddBlogs from "../Pages/AddBlogs/AddBlogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import VulanteerAllBlood from "../DashboardComponent/DonorElements/VulanteerDashboard/VulanteerAllBlood";
import AdminRoute from "./AdminRoute";
import VolanteerRoute from "./VolanteerRoute";
import VolanteerContent from "../DashboardComponent/DonorElements/VulanteerDashboard/VolanteerContent";
import SearchPage from "../Pages/SearchPage/SearchPage";
import BlogPost from "../Pages/BlogPost/BlogPost";
import PublicBlogDetails from "../Pages/BlogPost/PublicBlogDetails";
import Funding from "../Pages/Funding/Funding";
import Fundingcart from "../Pages/Funding/Fundingcart";
import Sidebar2 from "./Sidebar2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/donationreq',
                element: <Donationreq></Donationreq>
            },
            {
                path: '/donationreq/:id',
                element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
            }
            ,
            {
                path: '/searchblood',
                element: <SearchPage></SearchPage>
            }
            ,
            {
                path: '/blogpost',
                element: <BlogPost></BlogPost>
            },
            {
                path: '/public-blog-details/:id',
                element: <PublicBlogDetails></PublicBlogDetails>
            }
            ,
            {
                path: '/funding',
                element: <PrivateRoute><Funding></Funding></PrivateRoute>
            }
            ,
            {
                path: '/fundingcart',
                element: <PrivateRoute><Fundingcart></Fundingcart></PrivateRoute>
            }
        ]
    },
    {
        path : '/test',
        element : <Sidebar2></Sidebar2>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },

            //Donor Routes
            {
                index: 'true',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: 'create-donation-request',
                element: <PrivateRoute><DonorCreateReq></DonorCreateReq></PrivateRoute>
            },
            {
                path: 'my-donation-requests',
                element: <PrivateRoute> <MyReqDon></MyReqDon></PrivateRoute>
            },
            {
                path: 'reqDetail/:id',
                element: <PrivateRoute><ReqDonationDetails></ReqDonationDetails></PrivateRoute>
            },
            {
                path: 'reqUpdate/:id',
                element: <PrivateRoute><ReqUpdate></ReqUpdate></PrivateRoute>
            },


            //Admin
            {
                path: 'admin-all-users',
                element: <PrivateRoute>
                    <AllUser></AllUser>
                </PrivateRoute>
            },
            {
                path: 'admin-allBlood',
                element: <PrivateRoute><AdminRoute><AllBloodDonationreq></AllBloodDonationreq></AdminRoute></PrivateRoute>
            }
            ,
            {
                path: 'content-management',
                element: <PrivateRoute> <AdminRoute><AdminContent></AdminContent></AdminRoute></PrivateRoute>
            }
            ,
            {
                path: 'add-blogs',
                element: <PrivateRoute><AddBlogs></AddBlogs></PrivateRoute>
            }
            ,
            {
                path: 'blog-details/:id',
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            },
            //Volanteer
            {
                path: 'Vulanteer-allBlood',
                element: <PrivateRoute><VolanteerRoute><VulanteerAllBlood></VulanteerAllBlood></VolanteerRoute></PrivateRoute>
            },
            {
                path: 'volanteer-content-management',
                element: <PrivateRoute> <VolanteerRoute><VolanteerContent></VolanteerContent></VolanteerRoute></PrivateRoute>
            }
           
        ]
    }
]);


export default router;