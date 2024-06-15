import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const Funding = () => {
    const axiosSecure = useAxiosSecure()
    const { data: Allfunding = [], refetch, isLoading } = useQuery({
        queryKey: ['Allfunding'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/fund-all`)
            console.log(data);
            return data
        }
    });
    return (
        <div>
            <section className="">
                <div className=" bg-cover min-h-[250px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">My Booking Details</h1>
                    </div>
                </div>
            </section>
            <div className="max-w-6xl mx-auto mt-5">
                <div className="flex justify-end">
                    <Link to='/fundingcart' className="btn">Donate</Link>
                </div>
            </div>

            <div>
                <div className='max-w-6xl mx-auto'>
                    <div className='py-8'>
                        <div className=' px-2 sm:px-4 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal text-center'>
                                    <thead className="bg-red-400" >
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3  border-b border-gray-200 text-white  text-sm uppercase font-semibold'
                                            >
                                                #
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3  border-b border-gray-200 text-white   text-sm uppercase font-semibold'
                                            >
                                                Name
                                            </th>

                                            <th
                                                scope='col'
                                                className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                            >
                                                Fund Amount
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                            >
                                                Date
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Allfunding.map((fd, index) => <tr key={fd._id}>

                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    {index + 1}
                                                </td>

                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{fd?.name}</p>
                                                </td>


                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>${fd?.fund}</p>
                                                </td>
                                                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>{new Date(fd?.date).toLocaleDateString()}</p>
                                                </td>

                                            </tr>)
                                        }
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

export default Funding;