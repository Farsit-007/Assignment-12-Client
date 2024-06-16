import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ReqDonationDetails = () => {
    const {id} = useParams()
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: details = [], refetch ,isLoading} = useQuery({
        queryKey: ['details',id],
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
   
    return (
        <div>
            <section className="">
                <div className=" bg-cover max-h-[200px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-6xl xl:max-w-3xl text-white playfair ">My Booking Details</h1>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-3 p-2  lg:col-span-2">
                    <div className="pt-5">
                        <h1 className="text-xl font-semibold ">Recipient Details </h1>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="1000" className="py-8">
                        <div className="overflow-x-auto">
                            <table className="table text-md ">
                                <tbody >

                                    <tr className=''>

                                        <th>Name </th>
                                        <td>:</td>
                                        <td>{details.RecipientName}</td>

                                    </tr >

                                    <tr className=''>

                                        <th>Location</th>
                                        <td>:</td>
                                        <td className="">{details.district} , {details.upazila}</td>

                                    </tr>

                                    <tr className=''>

                                        <th>Date & Time</th>
                                        <td>:</td>
                                        <td>{details.time} {}</td>


                                    </tr>

                                    <tr className=''>

                                        <th>Hospital Name</th>
                                        <td>:</td>
                                        <td>{details.HospitalName}</td>
                                    </tr>
                                    <tr className=''>

                                        <th>Blood Group</th>
                                        <td>:</td>
                                        <td>{details.blood}</td>
                                    </tr>
                                    <tr className=''>

                                        <th>Address</th>
                                        <td>:</td>
                                        <td>{details.Address}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="pt-5 flex gap-4 items-center text-4xl  ">

                            <h1 className="text-2xl font-bold">Why Blood Need</h1>
                        </div>
                        <div className="py-5 ">
                            <p className="flex gap-2 items-center">{details.message}</p>
                        </div>
                    </div>
                </div>
                <div className=" col-span-3 p-2  lg:col-span-1">
                    <div className="pt-5 text-center">
                        <h1 className="text-xl font-semibold ">Donation Status </h1>
                        <div className="badge badge-secondary badge-outline my-4">{details.status}</div>
                        <div className="flex justify-around">
                       {
                        details.status === 'inprogress' ? <>
                        <button className="btn" onClick={() => handleStatusChange(details._id, 'done')}>done</button>
                         <button className="btn"  onClick={() => handleStatusChange(details._id, 'cancel')}>cancel</button>
                        </> : <></>
                       }
                        </div>
                    </div>
                    <div className="pt-5 text-center">
                        <h1 className="text-xl font-semibold ">Donor Info </h1>
                       
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default ReqDonationDetails;