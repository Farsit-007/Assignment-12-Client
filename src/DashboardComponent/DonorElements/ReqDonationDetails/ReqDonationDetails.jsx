import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const ReqDonationDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { data: details = [], refetch, isLoading } = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/DonationDetails/${id}`)
            console.log(data);
            return data
        }
    });

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
    if (isLoading) return <LoadingSpinner />;
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inprogress':
                return 'bg-blue-100 text-blue-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            case 'cancel':
                return 'bg-red-400 text-red-800';
            default:
                return 'bg-white text-gray-900';
        }
    };


    return (
        <div>

            <div className="grid mx-5 grid-cols-3 gap-5">
                <div className="col-span-3  lg:col-span-2">
                    <div className="my-5  rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
                        <h1 className="text-2xl p-2 px-5 text-white font-bold ">Recipient Details </h1>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="1000" className="py-4">
                        <div className="overflow-x-auto">
                            <table className="table text-[16px]">
                                <tbody >
                                    <tr className=''>
                                        <th>Name </th>
                                        <th>:</th>
                                        <td>{details.RecipientName}</td>
                                    </tr >
                                    <tr className=''>
                                        <th>Blood Group</th>
                                        <th>:</th>
                                        <td><div className="badge badge-accent badge-outline">
                                            {details.blood}
                                        </div></td>
                                    </tr>
                                    <tr className=''>

                                        <th>Hospital Name</th>
                                        <th>:</th>
                                        <td>{details.HospitalName}</td>
                                    </tr>



                                    <tr className=''>

                                        <th>Date </th>
                                        <th>:</th>
                                        <td>{details.time.slice(0, 10)} </td>
                                    </tr>
                                    <tr className=''>
                                        <th>Time</th>
                                        <th>:</th>
                                        <td>{details.time.slice(10, 20)} </td>
                                    </tr>




                                    <tr className=''>

                                        <th>Location</th>
                                        <th>:</th>
                                        <td className="">{details.district} , {details.upazila}</td>

                                    </tr>
                                    <tr className=''>

                                        <th>Address</th>
                                        <th>:</th>
                                        <td>{details.Address}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className=" bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000]">
                            <h1 className="text-2xl p-2 px-5 text-white font-bold ">Reason For In Need Of Blood </h1>
                        </div>

                        <div className="rounded-lg my-3 p-2 bg-rose-100 border">
                            <p className="">{details.message}</p>
                        </div>
                    </div>
                </div>
                <div className=" col-span-3 lg:col-span-1">
                    <div className="text-center">
                        <div className="mt-5 mb-3 lg:ml-5 rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
                            <h1 className="text-2xl p-2 px-5  text-white font-bold ">Donation Status</h1>
                        </div>
                       
                            

                        <div className="flex justify-around items-center lg:ml-5 border rounded-lg bg-rose-100 p-4">
                        <div className={`badge p-4 text-[16px] font-semibold ${getStatusColor(details.status)}`}>
                                <p className='whitespace-no-wrap'>{details.status === 'pending' && 'Pending' || details.status === 'inprogress' && 'Inprogress' || details.status === 'done' && 'Done' || details.status === 'cancel' && 'Canceled'}</p>
                            </div>
                            {
                                details.status === 'inprogress' ? <>
                                    <button className="btn btn-sm transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-2xl  hover:text-[#5D0911]" onClick={() => handleStatusChange(details._id, 'done')}>Done</button>
                                    <button className="btn btn-sm transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-2xl  hover:text-[#5D0911]" onClick={() => handleStatusChange(details._id, 'cancel')}>Cancel</button>
                                </> : <></>
                            }
                        </div>
                    </div>
                   {
                    details.status !== "pending" &&  <div className=" ">
                    <div className="mt-5 text-center mb-3 lg:ml-5 rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
                            <h1 className="text-2xl p-2 px-5  text-white font-bold ">Donar Info</h1>
                        </div>
                        <div className="rounded-lg my-3 lg:ml-5 p-3 bg-rose-100 border">
                            <table className="font-semibold">
                                <tbody>
                                   <tr>
                                   <th>
                                        Name 
                                    </th>
                                    <td className="px-5">
                                        :
                                    </td>
                                    <td>
                                    {details.DonationName}
                                    </td>
                                   </tr>

                                   <tr>
                                   <th>
                                         Email 
                                    </th>
                                    <td className="px-5">
                                        :
                                    </td>
                                    <td>
                                    {details.DonationEmail}
                                    </td>
                                   </tr>
                                </tbody>
                            </table>
                        </div>

                    </div> 
                   }

                </div>
            </div>
        </div>
    );
};

export default ReqDonationDetails;