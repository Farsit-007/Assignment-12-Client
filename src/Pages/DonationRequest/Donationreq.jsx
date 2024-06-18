import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Donationreq = () => {
    const axiosPublic = useAxiosPublic()
    const { data: donorcard = [], isLoading } = useQuery({
        queryKey: ['donorcard'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/publicDonor`)
            return data
        }
    });
    if (isLoading) return <LoadingSpinner />
    return (
        <div>
            <Helmet>
            <title> Hope In Drops | Donation Request</title>
            </Helmet>
            <section className="">
                <div className=" bg-cover md:h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col justify-center items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl text-white mt-8 md:mt-24 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">Donation Request</h1>
                    </div>
                </div>
            </section>
            
         
            <div>
                <div className='max-w-6xl mx-auto'>
                    <div className='py-[43px]'>
                        <div className=' px-2 sm:px-4 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full font-semibold leading-normal text-center'>
                                    <thead className="bg-gradient-to-r  from-[#5D0911] to-[#ac0000]" >
                                        <tr>
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
                                                Location
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                            >
                                                Blood Group
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
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {donorcard.filter(dcard => dcard.status === 'pending').map((item) => (
                                            <tr key={item.id} className="text-center">
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{item.RecipientName}</p>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{item.district} , {item.upazila}</p>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <div className='text-gray-900 badge badge-accent badge-outline whitespace-no-wrap'>{item.blood}</div>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{item.time.slice(0, 10)}</p>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{item.time.slice(10, 20)}</p>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <Link to={`/donationreq/${item._id}`}>
                                                        <button className="  btn btn-sm transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-3xl hover:text-[#5D0911]">View Details</button>
                                                    </Link>
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
    );
};

export default Donationreq;