/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BlogCard = ({ blog , refetch,role}) => {
    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/deleteblog/${id}`)
            return data
        },
        onSuccess: data => {
            refetch()
        }
    })
    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axiosSecure.patch(`/blogstatus/${id}`, { status });
            if (data.modifiedCount > 0) {
                refetch();
                alert("Updated")
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
    };

    const handleDelete =async(id)=>{
        try {
            const { data } = await mutateAsync(id)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="flex flex-row gap-5 relative  rounded-xl border">
            
               <div>
               <figure className="rounded-xl h-[150px] md:w-[230px] overflow-hidden">
                    <img
                        src={blog.image}
                        className="block object-cover h-full w-full "
                    />
                </figure>
                <div className="absolute top-3 left-3">
                    <div className="badge badge-ghost bg-[#cfaf45] border-none text-white "> {blog.status}</div>
                </div>
               </div>
          
            <div className="flex flex-col  justify-around w-36 md:w-40">
                <div className="space-y-2">
                <h2 className="card-title">{blog.title}</h2>
                <p className="">{blog.content.slice(0,40)}...</p>
                </div>
                <div className="flex gap-3">
                    <Link to={`/dashboard/blog-details/${blog._id}`}className="btn btn-sm">View</Link>
                   {
                    role === "admin" && <>
                     <button onClick={()=>handleStatusChange(blog._id,blog.status === 'draft' ? 'published' : 'draft')} className="btn btn-sm">
                        {
                            blog.status === 'draft' ? 'Publish' : 'Unpublish'
                        }
                    </button>
                    <button onClick={()=>handleDelete(blog._id)} className="btn btn-sm">Delete</button>
                    </>
                   }
                </div>
            </div>
        </div>
    );
};

export default BlogCard;