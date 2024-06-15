import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import AlluserTable from "./AlluserTable";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUser = () => {
    const axiosSecure = useAxiosSecure()
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
            </div>
       
    );
};

export default AllUser;