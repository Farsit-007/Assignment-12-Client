import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useRole from "../../../Hooks/useRole";
import BlogCard from "../AdminDashboard/BlogCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const VolanteerContent = () => {
    const [filter, setFilter] = useState('');
    const[role] = useRole()
    const axiosSecure = useAxiosSecure()
    const { data: Allblogs = [], refetch, isLoading } = useQuery({
        queryKey: ['Allblogs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/Vol-Allblogs?filter=${filter}`);
            return data;
        }
    });
    useEffect(()=>{
        refetch()
    },[filter])
    return (
        <div>
             <div className="flex justify-between my-5 mx-4 md:mx-5 px-4 py-1  items-center rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000] ">
                <div>
                    <select
                        onChange={e => setFilter(e.target.value)}
                        value={filter}
                        name='status'
                        id='status'
                        className='border-rose-100 text-rose-100 bg-transparent font-bold text-xl rounded-md'
                    >
                        <option className="bg-[#5D0911] " value=''>Filter By Status</option>
                        <option className="bg-[#5D0911]" value='draft'>Draft</option>
                        <option className="bg-[#5D0911]" value='published'>Publish</option>
                    </select>
                </div>
                <Link to='/dashboard/vol-add-blogs' className="btn border-rose-100 text-rose-100 bg-transparent font-bold text-xl rounded-md">Create Blogs</Link>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 ">
                {
                    Allblogs.map(blog => <BlogCard role={role} key={blog._id} blog={blog} refetch={refetch}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default VolanteerContent;