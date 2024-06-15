import { BiSolidBookContent } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const VolunteerMenu = () => {
    return (
        <ul className="">
        <li>
            <NavLink end to='/dashboard'
                 className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100 rounded-md  hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                    }`
                }>
                <MdDashboardCustomize className='w-5 h-5 '/>
                <span className='mx-3 font-medium'>Dashboard</span>
            </NavLink>
        </li>
        <li>
            <NavLink
            to='/dashboard/Vulanteer-allBlood'
            className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100   hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                }`
            }>
                <VscGitPullRequestGoToChanges className='w-5  h-5' />
                <span className='mx-3 font-medium'> All Blood Donation</span>
            </NavLink>
        </li>
        <li>
            <NavLink
            to='/dashboard/volanteer-content-management'
            className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md my-5 font-medium transition-colors duration-300 transform  hover:bg-rose-100   hover:text-[#5D0911] ${isActive ? 'bg-rose-100  text-[#5D0911]' : 'text-white'
                }`
            }>
               <BiSolidBookContent className='w-5 h-5 '/>
               <span className='mx-3 font-medium'>Content Management</span>
            </NavLink>
        </li>
    </ul>
    );
};

export default VolunteerMenu;