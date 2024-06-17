import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import '../Header/Header.css';
import useAuth from "../../Hooks/useAuth";
import logo from '../../../public/LOGO.png'
import { FaDroplet } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
import { MdOutlineAddIcCall } from "react-icons/md";
const Header = () => {
    const { user, logOut } = useAuth();
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const Links = (
        <>
            <li className="text-lg font-bold mr-2 uppercase"><NavLink
            className={({ isActive }) =>
                `transition-colors duration-300 transform hover:bg-rose-100 rounded-md hover:text-[#5D0911] ${
                    isActive ? 'bg-rose-100 focus:bg-rose-100 text-[#5D0911]' : 'text-white'
                }`
            }
            to='/'>Home</NavLink></li>
            <li className="text-lg font-bold mr-2 uppercase"><NavLink 
             className={({ isActive }) =>
                `transition-colors duration-300 transform hover:bg-rose-100 rounded-md hover:text-[#5D0911] ${
                    isActive ? 'bg-rose-100 focus:bg-rose-100 text-[#5D0911]' : 'text-white'
                }`
            }
            to='/donationreq'>Donation Requests</NavLink></li>
            <li className="text-lg font-bold mr-2 uppercase"><NavLink 
             className={({ isActive }) =>
                `transition-colors duration-300 transform hover:bg-rose-100 rounded-md hover:text-[#5D0911] ${
                    isActive ? 'bg-rose-100 focus:bg-rose-100 text-[#5D0911]' : 'text-white'
                }`
            }
            to='/blogpost'>Blogs</NavLink></li>
            <li className="text-lg font-bold mr-2 uppercase"><NavLink
             className={({ isActive }) =>
                `transition-colors duration-300 transform hover:bg-rose-100 rounded-md hover:text-[#5D0911] ${
                    isActive ? 'bg-rose-100 focus:bg-rose-100 text-[#5D0911]' : 'text-white'
                }`
            }
            to='/funding'>Funding</NavLink></li>
        </>
    );

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="relative">
            <div className={`black-portion md:h-8 pt-1 bg-rose-100 hidden md:block fixed top-0 left-0 right-0 transition-all duration-1000 ${active ? "hidden" : ""}`}>
                <div className="flex justify-between max-w-6xl mx-auto px-2">
                    <div className="flex items-center text-[#5D0911] italic">
                        <FaDroplet className='w-5  h-5' />
                        <span className='mx-3 font-medium'>Donate Blood, Spread Love</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center text-[#5D0911] italic">
                            <SiMinutemailer className='w-5  h-5' />
                            <span className='mx-3 font-medium'>hopeindrops@gmail.com</span>
                        </div>
                        <div className="flex items-center text-[#5D0911] italic">
                        <MdOutlineAddIcCall className='w-5  h-5'/>
                            <span className='mx-3 font-medium'>+880 16322-16145</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`navbar bg-gradient-to-r from-[#5D0911] to-[#ac0000]  py-2 lg:px-24 transition-all duration-1000 z-50 fixed left-0 right-0 ${active ? "active-header" : "top-10"}`}>
                <div className="navbar-start">
                    <div className="dropdown text-white ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-[#5D0911] text-white">
                            {Links}
                        </ul>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Link to='/' className="text-xl text-white md:text-4xl font-extrabold">
                            <div className="w-[190px] md:w-[280px]">
                                <img src={logo} alt="" />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1  text-white">
                            {Links}
                        </ul>
                    </div>
                    {user ? (
                        <div className="navbar-end flex items-center gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User avatar" src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box">
                                    <li>
                                        <Link to="dashboard" className="justify-between uppercase">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li><Link to='/login' onClick={handleLogout} className="uppercase">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-end flex items-center gap-2 md:pl-8">
                            <Link to='/login' className="text-[16px] font-bold btn p-2 md:p-3 bg-transparent text-white">Login</Link>
                            <Link to='/register' className="text-[16px] font-bold p-2 md:p-3  btn bg-transparent text-white">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
