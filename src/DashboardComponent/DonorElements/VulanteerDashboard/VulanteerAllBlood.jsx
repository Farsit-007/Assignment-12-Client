import { useQuery } from "@tanstack/react-query";
import WelsomeMessage from "../../../Components/WelcomeMessage/WelsomeMessage";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const VulanteerAllBlood = () => {
    const [menuVisible, setMenuVisible] = useState({});
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: donation = [], refetch, isLoading } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/vol-create-donation-request`);
            return data;
        }
    });

    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axiosSecure.patch(`updatestatus/${id}`, { status });
            if (data.modifiedCount > 0) {
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            setMenuVisible({});
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
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


    const toggleMenu = (event, id) => {
        event.stopPropagation();
        setMenuVisible((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (isLoading || loading) return <LoadingSpinner />;
    return (
        <div className="">
            <Helmet
            >
            <title> Hope In Drops | All Blood Donations</title>
            </Helmet>
            <div>
                <WelsomeMessage message={`Hey ${user.displayName} Welcome To Hope In Drops`}></WelsomeMessage>
            </div>
            {donation.length > 0 && (
               
               
                        <div className=''>
                            <div className=' mx-5 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                    <table className='min-w-full font-semibold leading-normal text-center'>
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
                                                <tr className="text-center" key={d._id}>
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
                                                            <p className='whitespace-no-wrap'>{ d.status === 'pending' && 'Pending' || d.status === 'inprogress' && 'Inprogress' ||d.status === 'done' && 'Done' || d.status === 'cancel' && 'Canceled'}</p>
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
                                                        <p className='text-gray-900 whitespace-no-wrap'>  <div className="menu-wrapper">
                                                            <div className="menu-trigger flex justify-center cursor-pointer relative" onClick={(e) => toggleMenu(e, `action-${d._id}`)}>
                                                            <BsThreeDotsVertical />
                                                            </div>
                                                            {menuVisible[`action-${d._id}`] && (
                                                                <ul className="flex gap-4 absolute top-[2%] right-[53%] justify-center bg-gradient-to-r   from-[#5D0911] to-[#ac0000] rounded-lg p-2">

                                                                    <li>
                                                                        <Link className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]" to={`/dashboard/reqDetail/${d._id}`}>View</Link>
                                                                    </li>

                                                                    {
                                                                        d.status === 'inprogress' && <>
                                                                            <li><button className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]" onClick={() => handleStatusChange(d._id, 'done')}>Done</button></li>
                                                                            <li><button className="transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]" onClick={() => handleStatusChange(d._id, 'cancel')}>Cancel</button></li>
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
                   
            )}
        </div>
    );
};

export default VulanteerAllBlood;
