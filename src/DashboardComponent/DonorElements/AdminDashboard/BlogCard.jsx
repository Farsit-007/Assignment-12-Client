/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
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
                toast.success(`Blogs ${status === 'draft' ? 'Unpublished' : "Published"}`)
            }
        } catch (error) {
            console.log(error);
        }
        refetch();
    };

    const handleDelete =async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await mutateAsync(id)
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blogs has been deleted.",
                        icon: "success"
                    });
                }
            }
        });     
    }

    return (

        <div className="flex flex-row gap-2 lg:gap-5 relative bg-[#fff5f5] rounded-xl border border-[#5D0911]">

               <div className="">
               <figure className="rounded-xl w-[150px] h-[150px] md:w-[230px] overflow-hidden">
                    <img
                        src={blog.image}
                        className="block object-cover h-full w-full "
                    />
                </figure>
                <div className="absolute top-3 left-3">
                    <div className="badge badge-ghost font-semibold bg-[#5D0911] border-none text-rose-100 "> {blog.status === 'draft' && "Draft" || blog.status === 'published' && "Published"}</div>
                </div>
               </div>
          
            <div className="flex flex-col justify-around w-36 md:w-40">
                <div className="space-y-2">
                <h2 className="card-title text-[#5D0911]">{blog.title}</h2>
                <p className="text-[#5D0911]">{blog.content.slice(0,20)}...</p>
                </div>
                <div className="flex gap-3">
                    <Link to={`/dashboard/blog-details/${blog._id}`} className="btn btn-sm transition-colors duration-300 transform hover:border-[#5D0911]  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-2xl  hover:text-[#5D0911]">View</Link>
                   {
                    role === "admin" && <>
                     <button onClick={()=>handleStatusChange(blog._id,blog.status === 'draft' ? 'published' : 'draft')} className="btn btn-sm hover:border-[#5D0911] transition-colors duration-300 transform   text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-2xl hover:text-[#5D0911]">
                        {
                            blog.status === 'draft' ? 'Publish' : 'Unpublish'
                        }
                    </button>
                    <button onClick={()=>handleDelete(blog._id)} className="btn btn-sm transition-colors duration-300 transform hover:border-[#5D0911] text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-2xl  hover:text-[#5D0911]">Delete</button>
                    </>
                   }
                </div>
            </div>
        </div>
    );
};

export default BlogCard;