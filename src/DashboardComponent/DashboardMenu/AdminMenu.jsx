import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <ul className="">
            <li>
                <NavLink end to='/dashboard'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }>
                    Dashboad Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                to='/dashboard/admin-all-users'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }>
                    All Users Page
                </NavLink>
            </li>
            <li>
                <NavLink
                to='/dashboard/admin-allBlood'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }>
                    All Blood Donation Request
                </NavLink>
            </li>
            <li>
                <NavLink
                to='/dashboard/content-management'
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                        }`
                    }>
                    Content Management
                </NavLink>
            </li>
        </ul>
    );
};

export default AdminMenu;