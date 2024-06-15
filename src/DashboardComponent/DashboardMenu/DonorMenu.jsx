import { NavLink } from "react-router-dom";
import useStatus from "../../Hooks/useStatus";

const DonorMenu = () => {
    const [status, isLoading] = useStatus()
    return (
        <ul className="">
            <li><NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }>Dashboad Home</NavLink></li>
            <li><NavLink to='/dashboard/my-donation-requests'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                }>My Donation Requests</NavLink></li>
            <li>
                {status === 'blocked' ? (
                    <span
                        className="flex items-center px-4 py-2 my-5 cursor-not-allowed bg-gray-200 text-gray-400"
                        title="User has been blocked by admin!! cann't make a request"
                    >
                        Create Donation Request
                    </span>
                ) : (
                    <NavLink
                        to="/dashboard/create-donation-request"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                            }`
                        }
                    >
                        Create Donation Request
                    </NavLink>
                )}
            </li>
        </ul>
    );
};

export default DonorMenu;