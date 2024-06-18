import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PBlogCard from "./PBlogCard";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allblogs = [], isLoading } = useQuery({
        queryKey: ['allblogs'],
        queryFn: async () => {
            const { data } = await axiosPublic('/publicBlog')
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
           <Helmet>
            <title> Hope In Drops | Blogs</title>
            </Helmet>
            <section className="mb-[69px]">
                <div className=" bg-cover md:h-[300px] bg-slate-50 " style={{ backgroundImage: `url(./dd.jpg)` }}>

                    <div className="container flex flex-col justify-center items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl text-[#5D0911] mt-8 md:mt-24 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">Blogs</h1>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto py-10 px-4 lg:px-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    allblogs.filter(b=> b.status ==='published').map(blog => <PBlogCard key={blog._id} blog={blog}></PBlogCard>)
                }
            </div>
        </div>
    );
};

export default BlogPost;