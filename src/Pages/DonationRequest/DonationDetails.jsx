import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { FaDroplet } from "react-icons/fa6";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
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
            return toast.error("Your Blood Not Matched With Requirement")
        }
        const donInfo = {
            status,
            DonationName: user?.displayName,
            DonationEmail: user?.email
        }
        setShowModal(true)
        if (showModal === false) {
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
        toast.success("Donate Blood Spread Love")
        setShowModal(false);
        navigate('/')
    };
    if (isLoading || loading) return <LoadingSpinner />;
    return (
        <div>
            <Helmet>
            <title> Hope In Drops | Donation Details</title>
            </Helmet>
            <section className="">
                <div className=" bg-cover md:h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.ibb.co/zSwZjBM/7187863.jpg)` }}>

                    <div className="container flex flex-col justify-center items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl text-[#5D0911] mt-8 md:mt-24 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">Donation Details</h1>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-4 gap-8 max-w-6xl p-8 my-5 lg:p-0 mx-auto">
                <div className="col-span-4 lg:col-span-3">
                    <div className="mt-5 bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000]">
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
                        <div className="mt-5 bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000]">
                            <h1 className="text-2xl p-2 px-5 text-white font-bold ">Reason For In Need Of Blood </h1>
                        </div>
                        <div className="rounded-lg my-2 p-2 bg-rose-100 border">
                            <p className="">{details.message}</p>
                        </div>
                    </div>
                </div>

                <div className=" col-span-4 lg:col-span-1">
                    <div className="mt-5 bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000]">
                    <div className="flex items-center p-3 text-white italic">
                            <FaDroplet className='w-5  h-5' />
                            <span className='mx-3 font-medium'>Give Blood, Save Lives</span>
                        </div>
                    </div>
                    
                    

                   
                    <div className="my-4 p-2 rounded-lg space-y-3 bg-rose-100 border">
                       <div className="flex items-center gap-2">
                       <IoMdArrowDroprightCircle className="w-5 h-5 lg:w-7 lg:h-7"/>
                       <p >Hydrate, eat well, and rest before donating.</p>
                       </div>
                       <div className="flex items-center gap-2">
                       <IoMdArrowDroprightCircle className="w-5 h-5 lg:w-7 lg:h-7"/>
                       <p >Meet criteria, feel healthy, and answer honestly</p>
                       </div>
                       <div className="flex items-center gap-2">
                       <IoMdArrowDroprightCircle className="w-5 h-5 lg:w-8 lg:h-8"/>
                       <p >Rest, avoid heavy lifting, and monitor for symptoms.</p>
                       </div>
                        
                    </div>
                    <div className="flex justify-center">
                        <button disabled={user?.email === details.RequestEmail} onClick={() => handleStatusChange(details.blood, details._id, 'inprogress')} className="w-full px-8 btn transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md text-xl hover:text-[#5D0911]">Donate</button>
                    </div>
                </div>

            </div>




            {showModal && (
                <div className="fixed  inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-[320px] p-6 my-8 mx-auto rounded-lg bg-[#5D0911] border border-[#5D0911] ">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-white  leading-6 ">Donations</h3>
                            <div className="flex py-4 text-[#5D0911]   flex-col gap-3">
                                <input disabled type="text" placeholder={user?.displayName} className="rounded-lg cursor-not-allowed    w-full max-w-xs" />
                                <input disabled type="text" placeholder={user?.email} className="rounded-lg cursor-not-allowed w-full  text-[#5D0911]  max-w-xs" />
                            </div>
                        </div>
                        <div className=" text-center">
                            <button
                                onClick={closeModal}
                                className="bg-transparent w-full justify-center text-lg font-bold border border-rose-100 text-white  p-2 flex gap-1 items-center hover:text-[#5D0911] hover:bg-rose-100 px-4 transition-all duration-1000 rounded"
                            >
                                Confirmed Donation
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default DonationDetails;