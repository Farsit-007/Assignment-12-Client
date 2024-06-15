import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PBlogCard from "./PBlogCard";

const BlogPost = () => {
    const axiosPublic = useAxiosPublic()
    const { data : allblogs = [], refetch, isLoading } = useQuery({
        queryKey: ['allblogs'],
        queryFn: async () => {
            const { data } = await axiosPublic('/publicBlog')
            return data
        }
    })
    return (
        <div>
               <section className="">
                <div className=" bg-cover md:h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col justify-center items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl text-white mt-8 md:mt-24 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">Donation Details</h1>
                    </div>
                </div>
            </section>

            <div className="gird my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                 {
                    allblogs.map(blog=><PBlogCard key={blog._id}  blog={blog}></PBlogCard>)
                 }
            </div>
        </div>
    );
};

export default BlogPost;