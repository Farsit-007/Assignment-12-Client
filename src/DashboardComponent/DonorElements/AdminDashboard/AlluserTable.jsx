/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateRole from "./UpdateRole";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AlluserTable = ({ user, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { user: loginUser } = useAuth()
    const { mutateAsync } = useMutation({
        mutationFn: async role => {
            const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role)
            return data
        },
        onSuccess: data => {
            refetch()
            toast.success("User Role Updated")
            setIsOpen(false)
        }
    })
    const modalHandler = async (selected) => {
        if (loginUser.email === user?.email) {
            return setIsOpen(false)
        }
        const userRole = {
            role: selected
        }
        try {
            const { data } = await mutateAsync(userRole)
        } catch (error) {
            console.log(error);
        }
    }

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-300';
            case 'donor':
                return 'bg-green-300';
            case 'volunteer':
                return 'bg-blue-300';
            default:
                return 'bg-gray-900';
        }
    };




    const handleStatusChange = async (id, status) => {
        refetch();
        try {
            const { data } = await axiosSecure.patch(`/adminupdatestatus/${id}`, { status });
            if (data.modifiedCount > 0) {
                refetch();
                toast.success(`User ${status === 'blocked' ? 'Blocked' : "Unblocked"}`)
            }
        } catch (error) {
            toast.error(error.message);
        }

    };



    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-yellow-100 text-yellow-800'; 
            case 'blocked':
                return 'bg-red-400'; 
            default:
                return 'bg-gray-900'; 
        }
    };

    return (

        <tr className="text-center" key={user._id}>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{user.email}
                </p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className={`badge p-3 font-semibold ${getRoleColor(user.role)}`}>
                    <p className={`whitespace-no-wrap `}>
                        {user.role === 'admin' && 'Admin' ||
                            user.role === 'donor' && 'Donor' ||
                            user.role === 'volunteer' && 'Volunteer'}
                    </p>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <div className={`badge p-3 font-semibold ${getStatusColor(user.status)}`}>
                <p className={`whitespace-no-wrap `}>
                    {user.status === 'active' && 'Active' || user.status === 'blocked' && 'Blocked'}
                </p>
                </div>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button disabled={user.role === 'admin'}
                    onClick={() => handleStatusChange(user._id, user.status === 'blocked' ? 'active' : 'blocked')}
                    className="btn btn-sm rounded-3xl font-semibold transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 hover:text-[#5D0911]">
                    {user.status === 'blocked' ? 'Unblock' : 'Block'}
                </button>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white font-semibold text-sm'>
                <button disabled={user.role === 'admin'}
                    onClick={() => setIsOpen(true)} className={`relative cursor-pointer inline-block px-3 font-bold text-green-900 py-2 leading-tight  ${user.role === 'admin' && 'bg-gray-600 rounded-2xl leading-tight  opacity-40 '}`}>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative '>Update Role</span>
                </button>
                <UpdateRole isOpen={isOpen} modalHandler={modalHandler} setIsOpen={setIsOpen} user={user}></UpdateRole>
            </td>
        </tr>

    );
};

export default AlluserTable;