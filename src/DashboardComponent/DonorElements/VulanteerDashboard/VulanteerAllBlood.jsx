import { useQuery } from "@tanstack/react-query";
import WelsomeMessage from "../../../Components/WelcomeMessage/WelsomeMessage";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
            <div>
                <WelsomeMessage message={`${user.displayName} Welcome To Blood Donation`}></WelsomeMessage>
            </div>
            {donation.length > 0 && (
                // <div>
                //     <div className="overflow-x-auto">
                //         <table className="table z-10">
                //             <thead>
                //                 <tr className="text-center">
                //                     <th>#</th>
                //                     <th>Recipient Name</th>
                //                     <th>Recipient Location</th>
                //                     <th>Date</th>
                //                     <th>Time</th>
                //                     <th>Status</th>
                //                     <th>Donor Info</th>
                //                     <th>Action</th>
                //                 </tr>
                //             </thead>
                //             <tbody>
                //                 {donation.map((d, index) => (
                //                     <tr className="text-center" key={d._id}>
                //                         <td>{index + 1}</td>
                //                         <td>{d.RecipientName}</td>
                //                         <td>{d.district}, {d.upazila}</td>
                //                         <td>{d.time.slice(0, 10)}</td>
                //                         <td>{d.time.slice(10, 30)}</td>
                //                         <td>{d.status}</td>
                //                         {d.status === 'inprogress' || d.status === 'done' || d.status === 'cancel' ? (
                //                             <td>{d.DonationName}<br />{d.DonationEmail}</td>
                //                         ) : (
                //                             <td></td>
                //                         )}
                //                         {/* {d.status === 'inprogress' ? (
                //                             <td>
                //                                 <div className="menu-wrapper">
                //                                     <div className="menu-trigger relative" onClick={(e) => toggleMenu(e, `status-${d._id}`)}>
                //                                         ⋮
                //                                     </div>
                //                                     {menuVisible[`status-${d._id}`] && (
                //                                         <ul className="flex gap-4 absolute top-0 right-16 justify-center bg-slate-200 rounded-lg p-1">
                //                                             <li><button onClick={() => handleStatusChange(d._id, 'done')}>done</button></li>
                //                                             <li><button onClick={() => handleStatusChange(d._id, 'cancel')}>cancel</button></li>
                //                                         </ul>
                //                                     )}
                //                                 </div>
                //                             </td>
                //                         ) : (
                //                             <td></td>
                //                         )} */}
                //                         <td className="relative">
                //                             <div className="menu-wrapper">
                //                                 <div className="menu-trigger relative" onClick={(e) => toggleMenu(e, `action-${d._id}`)}>
                //                                     ⋮
                //                                 </div>
                //                                 {menuVisible[`action-${d._id}`] && (
                //                                     <ul className="flex gap-4 absolute top-0 right-10 justify-center bg-slate-200 rounded-lg p-1">

                //                                         <li>
                //                                             <Link to={`/dashboard/reqDetail/${d._id}`}>View</Link>
                //                                         </li>



                //                                         {
                //                                             d.status === 'inprogress' && <>
                //                                                 <li><button onClick={() => handleStatusChange(d._id, 'done')}>done</button></li>
                //                                                 <li><button onClick={() => handleStatusChange(d._id, 'cancel')}>cancel</button></li>
                //                                             </>
                //                                         }
                //                                     </ul>
                //                                 )}
                //                             </div>
                //                         </td>
                //                     </tr>
                //                 ))}
                //             </tbody>
                //         </table>
                //     </div>
                // </div>
                <div>
                    <div className='max-w-6xl mx-auto'>
                        <div className='py-8'>
                            <div className=' px-2 sm:px-4 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                    <table className='min-w-full leading-normal text-center'>
                                        <thead className="bg-red-400" >
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
                                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                        <p className='text-gray-900 whitespace-no-wrap'> {d.status}</p>
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
                                                            <div className="menu-trigger relative" onClick={(e) => toggleMenu(e, `action-${d._id}`)}>
                                                                ⋮
                                                            </div>
                                                            {menuVisible[`action-${d._id}`] && (
                                                                <ul className="flex gap-4 absolute top-0 right-10 justify-center bg-slate-200 rounded-lg p-1">

                                                                    <li>
                                                                        <Link to={`/dashboard/reqDetail/${d._id}`}>View</Link>
                                                                    </li>

                                                                    {
                                                                        d.status === 'inprogress' && <>
                                                                            <li><button onClick={() => handleStatusChange(d._id, 'done')}>done</button></li>
                                                                            <li><button onClick={() => handleStatusChange(d._id, 'cancel')}>cancel</button></li>
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
            )}
        </div>
    );
};

export default VulanteerAllBlood;
