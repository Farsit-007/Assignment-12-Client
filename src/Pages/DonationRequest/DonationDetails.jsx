import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {  useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const DonationDetails = () => {
    const { id } = useParams()
    const [showModal, setShowModal] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { data: details = [], refetch, isLoading } = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/DonationDetails/${id}`)
            return data
        }
    });

    const { data: Userdetails = [] } = useQuery({
        queryKey: ['Userdetails', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/finduser/${user?.email}`)
            return data
        }
    });

    const handleStatusChange = async (blood, id, status) => {
        const isMatched = Userdetails.some(d => d.blood !== blood)
        if (isMatched) {
            return alert("No")
        }
        const donInfo = {
            status,
            DonationName : user?.displayName,
            DonationEmail : user?.email
        }
        setShowModal(true)
        if(showModal === false){
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/donateupdatestatus/${id}`, donInfo);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            } catch (error) {
                console.log(error);
            }
            refetch();
        }
        
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/')
    };
    if (isLoading || loading) return <LoadingSpinner />;
    return (
        <div>
            <section className="">
                <div className=" bg-cover max-h-[200px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-6xl xl:max-w-3xl text-white playfair ">My Booking Details</h1>
                    </div>
                </div>
            </section>
            <div className="w-[60%] mx-auto border my-5">
                <div className="">
                    <div className="pt-5 text-center">
                        <h1 className="text-xl font-semibold ">Recipient Details </h1>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="1000" className="py-4">
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
                                        <td>{details.time} { }</td>


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
                        <div className="pt-5 flex gap-4 items-center justify-center text-4xl  ">

                            <h1 className="text-2xl  font-bold">Why Blood Need</h1>
                        </div>
                        <div className="py-5 text-center ">
                            <p className="">{details.message}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center">
                <button disabled={user?.email === details.RequestEmail} onClick={() => handleStatusChange(details.blood, details._id, 'inprogress')} className="btn">Donate</button>
            </div>



            {showModal && (
                <div className="fixed  inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-md p-6 my-8 mx-auto bg-[#18181b] border border-[#cfaf45] rounded-sm">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-[#cfaf45]  leading-6 ">Reservations Details</h3>
                            <div>
                            <input disabled type="text" placeholder={user?.displayName} className="input input-bordered w-full max-w-xs" />
                            <input disabled type="text" placeholder={user?.email} className="input input-bordered w-full max-w-xs" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <button
                                onClick={closeModal}
                                className="bg-transparent w-full justify-center text-lg font-bold border border-[#cfaf45] text-[#cfaf45]  p-2 flex gap-1 items-center hover:text-white hover:bg-[#cfaf45] px-4 transition-all duration-1000 rounded"
                            >
                                Confirmed Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default DonationDetails;