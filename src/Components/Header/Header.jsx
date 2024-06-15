import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../Header/Header.css'
import useAuth from "../../Hooks/useAuth";
const Header = () => {
    const { user, logOut } = useAuth()
    const [active, setActive] = useState(false);
    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 100) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    })
    const Links =
        < >
            <li className="text-lg  font-bold uppercase"><NavLink to='/' >Home</NavLink></li>
            <li className="text-lg  font-bold uppercase"><NavLink to='/donationreq'>Donation Requests</NavLink></li>
            <li className="text-lg  font-bold uppercase"><NavLink to='/blogpost'> Blog</NavLink></li>
            <li className="text-lg  font-bold uppercase"><NavLink to='/funding'>Fundings</NavLink></li>
        </>

    const handleLogout = () => {
        logOut()
    }

    return (
        <div className="">
            <div className={`navbar bg-[#29292941] py-3 lg:px-24 transition-all duration-1000  z-50 fixed top-0 left-0 right-0 ${active ? "activecls" : ""}`}>
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 text-white">
                            {Links}
                        </ul>
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]">
                            <img src={f1} alt="" />
                        </div> */}
                        <Link to='/' className="text-xl text-white md:text-4xl font-extrabold ">Bistro Boss</Link>
                    </div>
                </div>

                <div className="navbar-end ">
                    <div className="navbar-center  hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-white">
                            {Links}
                        </ul>
                    </div>
                    {
                        user ?

                            <div className=" navbar-end flex items-center gap-2 ">
                                
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box ">
                                        <li>
                                            <Link to="dashboard" className="justify-between uppercase ">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li><Link to='/login' onClick={handleLogout} className="  uppercase ">Logout</Link></li>
                                    </ul>
                                </div>

                            </div> :
                            <div className="navbar-end flex items-center gap-2 md:pl-8">
                                <Link to='/login' className="text-[16px] font-bold btn bg-transparent text-white">Login</Link>
                                <Link to='/register' className="text-[16px] font-bold btn bg-transparent text-white">Register</Link>
                            </div>
                    }
                </div>


            </div>

        </div>



    );
};

export default Header;