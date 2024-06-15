import { useQuery } from "@tanstack/react-query";
import WelsomeMessage from "../../../Components/WelcomeMessage/WelsomeMessage";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import { useEffect,useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DonorDashboard = () => {
    const [menuVisible, setMenuVisible] = useState({});
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: donation = [], refetch, isLoading } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/create-donation-request/${user?.email}`);
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
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

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
                                                    <p className= ' text-gray-900 whitespace-no-wrap'> {d.district}, {d.upazila}</p>
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

                                                                <li>
                                                                    <Link to={`/dashboard/reqUpdate/${d._id}`}>Update</Link>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => handleDelete(d._id)}>Delete</button>
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

export default DonorDashboard;
