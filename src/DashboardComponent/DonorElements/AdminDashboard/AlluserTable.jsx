/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateRole from "./UpdateRole";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AlluserTable = ({ user, index, refetch }) => {
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




    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axiosSecure.patch(`/adminupdatestatus/${id}`, { status });
            if (data.modifiedCount > 0) {
                refetch();
                alert("Updated")
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
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
                <p className='text-gray-900 whitespace-no-wrap'>{user.role}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'> {user.status}</p>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button disabled={user.role === 'admin'}
                    onClick={() => handleStatusChange(user._id, user.status === 'blocked' ? 'active' : 'blocked')}
                    className="btn btn-xs">
                    {user.status === 'blocked' ? 'Unblock' : 'Block'}
                </button>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button disabled={user.role === 'admin'}
                    onClick={() => setIsOpen(true)} className={`relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${user.role === 'admin' && 'bg-gray-600 rounded-xl opacity-40 '}`}>
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