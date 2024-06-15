import { NavLink } from "react-router-dom";
import useStatus from "../../Hooks/useStatus";
import { MdDashboardCustomize } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoIosCreate } from "react-icons/io";
const DonorMenu = () => {
    const [status, isLoading] = useStatus()
    return (
        <ul className="">
            <li><NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                    }`
                }>
                   <MdDashboardCustomize className='w-5 h-5 '/>
                   <span className='mx-3 font-medium'>Dashboard</span>
                
                </NavLink></li>
            <li><NavLink to='/dashboard/my-donation-requests'
               className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                }`
            }>
                  <VscGitPullRequestGoToChanges className='w-5  h-5' />
                  <span className='mx-3 font-medium'>  My Donation </span>
              
                </NavLink></li>
            <li>
                {status === 'blocked' ? (
                    <span
                        className="flex items-center rounded-md px-4 py-2 my-5 cursor-not-allowed bg-gray-200 text-gray-400"
                        title="User has been blocked by admin!! cann't make a request"
                    >
                        <IoIosCreate className='w-5  h-5'/>
                        <span className='mx-3 font-medium'>Create Donation</span>
                    </span>
                ) : (
                    <NavLink
                        to="/dashboard/create-donation-request"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                            }`
                        }
                    >
                        <IoIosCreate className='w-5  h-5'/>
                        <span className='mx-3 font-medium'>Create Donation</span>
                        
                    </NavLink>
                )}
            </li>
        </ul>
    );
};

export default DonorMenu;