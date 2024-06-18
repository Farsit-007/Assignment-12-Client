import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import AlluserTable from "./AlluserTable";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import WelsomeMessage from "../../../Components/WelcomeMessage/WelsomeMessage";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AllUser = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: allusers = [], refetch, isLoading } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allusers`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />
    return (


        <div>
            <div>
                <WelsomeMessage message={`Hey ${user.displayName} Welcome To Hope In Drops`}></WelsomeMessage>
            </div>

         <Helmet>
            <title> Hope In Drops | All Users</title>
            </Helmet>
                <div className=''>
                    <div className=' mx-5 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full font-semibold leading-normal text-center'>
                                <thead className="bg-gradient-to-r  from-[#5D0911] to-[#ac0000]" >
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-5 py-3  border-b border-gray-200 text-white  text-sm uppercase font-semibold'
                                        >
                                            Avatar
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3  border-b border-gray-200 text-white   text-sm uppercase font-semibold'
                                        >
                                            User Name
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                        >
                                            User Email
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                        >
                                            User Role
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                        >
                                            User Status
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                        >
                                            Manage Activity
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3   border-b border-gray-200 text-white    text-sm uppercase font-semibold'
                                        >
                                            Manage Role
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allusers.map((user, index) =>
                                            <AlluserTable key={user._id} user={user} index={index} refetch={refetch}></AlluserTable>
                                        )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
     

    );
};

export default AllUser;