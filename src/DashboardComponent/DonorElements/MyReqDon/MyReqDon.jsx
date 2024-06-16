import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import WelsomeMessage from "../../../Components/WelcomeMessage/WelsomeMessage";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
const MyReqDon = () => {
    const [itemPerPage, setItemPerPage] = useState(8)
    const menuRef = useRef()
    const [menuVisible, setMenuVisible] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [count, setCount] = useState(0);
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: donation = [], refetch, isLoading } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/create-donation-request-all/${user?.email}?page=${currentPage}&size=${itemPerPage}&filter=${filter}`);
            return data;
        }
    });


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/deletereq/${id}`);
                if (data.deletedCount > 0) {
                    await updateDataAndCount();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    const updateDataAndCount = async () => {
        const countResponse = await axiosSecure.get(`/donation-request-count/${user?.email}?filter=${filter}`);
        const newCount = countResponse.data.count;
        setCount(newCount);
        const numberOfPage = Math.ceil(newCount / itemPerPage);
        if (currentPage > numberOfPage) {
            setCurrentPage(numberOfPage);
        }
        refetch();
    };
    useEffect(() => {
        updateDataAndCount();
    }, [itemPerPage, currentPage, filter]);


    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axiosSecure.patch(`/updatestatus/${id}`, { status });
            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
    };

    const numberOfPage = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPage).keys()].map(e => e + 1);

    
    const handleButton = (value) => {
        setCurrentPage(value);
    };

    const toggleMenu = (id) => {
        setMenuVisible(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const closeAllMenus = () => {
        setMenuVisible({});
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            closeAllMenus();
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleMenuClick = (event, id) => {
        event.stopPropagation();
        toggleMenu(id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inprogress':
                return 'bg-blue-100 text-blue-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            case 'cancel':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-white text-gray-900';
        }
    };
    if (loading || isLoading) return <LoadingSpinner />;

    return (
        <div className="">
            <div>
                <WelsomeMessage message={`${user.displayName} Welcome To Blood Donation`}></WelsomeMessage>
            </div>
            <div className="px-5 ">
                <select
                    onChange={e => setFilter(e.target.value)}
                    value={filter}
                    name='status'
                    id='status'
                    className='select w-40 '>
                    <option value=''>Filter By Status</option>
                    <option value='pending'>Pending</option>
                    <option value='inprogress'>Inprogress</option>
                    <option value='done'>Done</option>
                    <option value='cancel'>Cancel</option>
                </select>

            </div>
            {
                donation.length > 0 && <div>
                    <div>
                        <div className='max-w-6xl mx-auto'>
                            <div className='py-2'>
                                <div className=' px-2 sm:px-4 py-4 overflow-x-auto'>
                                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                        <table className='min-w-full leading-normal text-center'>
                                            <thead className="bg-gradient-to-r  from-[#5D0911] to-[#ac0000]" >
                                                <tr className="text-center">
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3  border-b border-gray-200 text-white  text-sm uppercase font-semibold'
                                                    >
                                                        Recipient Name
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3  border-b border-gray-200 text-white   text-sm uppercase font-semibold'
                                                    >
                                                        Recipient Location
                                                    </th>

                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                                    >
                                                        Time
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                                    >
                                                        Donor Info
                                                    </th>
                                                    <th
                                                        scope='col'
                                                        className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                                    >
                                                        Action
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {donation.map((d) => (
                                                    <tr className="text-center font-semibold" key={d._id}>
                                                        <td className='px-5  py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className='text-gray-900 whitespace-no-wrap'> {d.RecipientName}</p>
                                                        </td>
                                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className=' text-gray-900 whitespace-no-wrap'> {d.district}, {d.upazila}</p>
                                                        </td>
                                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className='text-gray-900 whitespace-no-wrap'> {d.time.slice(0, 10)}</p>
                                                        </td>
                                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className='text-gray-900 whitespace-no-wrap'> {d.time.slice(10, 30)}</p>
                                                        </td>
                                                        <td >
                                                        <div className={`badge p-3 font-semibold ${getStatusColor(d.status)}`}>
                                                            <p className='whitespace-no-wrap'>{ d.status === 'pending' && 'Pending' || d.status === 'inprogress' && 'Inprogress' ||d.status === 'done' && 'Done' || d.status === 'cancel' && 'Cancel'}</p>
                                                        </div>
                                                        </td>


                                                        {d.status === 'inprogress' || d.status === 'done' || d.status === 'cancel' ? (
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <p className='text-gray-900 whitespace-no-wrap'> {d.DonationName}<br />{d.DonationEmail}</p>
                                                            </td>
                                                        ) : (
                                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                                <p className='text-gray-900 whitespace-no-wrap'> </p>
                                                            </td>
                                                        )}

                                                        <td className='px-5 relative py-5 border-b border-gray-200 bg-white text-sm'>
                                                            <p className='text-gray-900 whitespace-no-wrap'>  <div className="menu-wrapper" ref={menuRef}>
                                                                <div className="menu-trigger flex justify-center cursor-pointer relative" onClick={(e) => handleMenuClick(e, `action-${d._id}`)}>
                                                                <BsThreeDotsVertical />
                                                                </div>
                                                                {menuVisible[`action-${d._id}`] && (
                                                                <ul className="flex gap-4 absolute top-[2%] right-[53%] justify-center bg-gradient-to-r   from-[#5D0911] to-[#ac0000] rounded-lg p-2">

                                                                    <li>
                                                                        <Link className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]" to={`/dashboard/reqDetail/${d._id}`}>View</Link>
                                                                    </li>
                                                                    {d.status === 'inprogress' || d.status === 'done' || d.status === 'cancel' ? (
                                                                       <></>
                                                                    ) : (
                                                                        <li>
                                                                        <Link
                                                                            className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]"
                                                                            to={`/dashboard/reqUpdate/${d._id}`}>Update</Link>
                                                                    </li>
                                                                    )}

                                                                    
                                                                    <li>
                                                                        <button
                                                                            className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]"
                                                                            onClick={() => handleDelete(d._id)}>Delete</button>
                                                                    </li>


                                                                    {
                                                                        d.status === 'inprogress' && <>
                                                                            <li><button
                                                                                className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]"
                                                                                onClick={() => handleStatusChange(d._id, 'done')}>done</button></li>
                                                                            <li><button
                                                                                className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]"
                                                                                onClick={() => handleStatusChange(d._id, 'cancel')}>cancel</button></li>
                                                                        </>
                                                                    }
                                                                </ul>
                                                            )}
                                                            </div></p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='flex justify-center mt-12'>

                {donation.length > 0 &&

                    <button
                        disabled={currentPage === 1}
                        onClick={() => handleButton(currentPage - 1)}
                        className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#5D0911] hover:text-white'>
                        <div className='flex items-center -mx-1'>
                        <IoIosArrowBack />
                        </div>
                    </button>
                }
                {donation.length > 0 ? 
                    <>
                        {pages.map(btnNum => (
                            <button
                                onClick={() => handleButton(btnNum)}
                                key={btnNum}
                                className={`hidden ${currentPage === btnNum ? 'bg-[#5D0911] text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform rounded-full sm:inline hover:bg-[#5D0911] hover:text-white`}
                            >
                                {btnNum}
                            </button>
                        ))}
                    </> : <div className="flex justify-center">
                         <p>No Data found On This Status</p>
                    </div>
                }
                {donation.length > 0 &&
                    <button
                        disabled={currentPage === numberOfPage}
                        onClick={() => handleButton(currentPage + 1)}
                        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#5D0911] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                        <div className='flex items-center -mx-1'>
                        <IoIosArrowForward />
                            
                        </div>
                    </button>
                }
            </div>
        </div>
    );
};

export default MyReqDon;
