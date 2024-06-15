import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminContent = () => {
    const [filter, setFilter] = useState('');
    const[role] = useRole()
    const axiosSecure = useAxiosSecure()
    const { data: Allblogs = [], refetch, isLoading } = useQuery({
        queryKey: ['Allblogs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Allblogs?filter=${filter}`);
            return data;
        }
    });
    useEffect(()=>{
        refetch()
    },[filter])
    return (
        <div>
            <div className="flex justify-between p-5">
                <div>
                    <select
                        onChange={e => setFilter(e.target.value)}
                        value={filter}
                        name='status'
                        id='status'
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Filter By Status</option>
                        <option value='draft'>Draft</option>
                        <option value='published'>Publish</option>
                    </select>
                </div>
                <Link to='/dashboard/add-blogs' className="btn">Add Blogs</Link>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 px-4 md:px-5 lg:px-8">
                {
                    Allblogs.map(blog => <BlogCard role={role} key={blog._id} blog={blog} refetch={refetch}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AdminContent;