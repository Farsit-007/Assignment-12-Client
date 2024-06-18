import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const PublicBlogDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: Bdetails = [], isLoading } = useQuery({
        queryKey: ['Bdetails', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/publicBlog-Details/${id}`)
            return data
        }
    });

    const { data: allblogs = [] } = useQuery({
        queryKey: ['allblogs'],
        queryFn: async () => {
            const { data } = await axiosPublic('/publicBlog')
            return data
        }
    })
    if (isLoading ) return <LoadingSpinner />;
    return (
        <div className="">
            <Helmet>
            <title> Hope In Drops | Blogs Details</title>
            </Helmet>
            <section className="">
                <div className=" bg-cover md:h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col justify-center items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                        <h1 className="text-4xl text-white mt-8 md:mt-24 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">Donation Details</h1>
                    </div>
                </div>
            </section>
            <div className="grid my-10 grid-cols-3 gap-8 max-w-6xl px-8 lg:px-0 mx-auto">
                <div className="col-span-3 lg:col-span-2 ">
                    <div className="my-5 rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
                        <h1 className="text-2xl p-2 px-5 text-white font-bold ">{Bdetails.title} </h1>
                    </div>
                    <figure className="" style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
                        <img
                            src={Bdetails.image}
                            className="block object-cover rounded-lg h-full w-full "
                        />

                    </figure>
                    <div className="p-3">
                        <p>{Bdetails.content}</p>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-1 ">
                    <div className="my-5 bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000]">
                        <h1 className="text-2xl p-2 px-5 text-white font-bold text-center">Latest Blogs </h1>
                    </div>
                    <div>
                        <section className=" dark:bg-gray-100 dark:text-gray-900">
                            <div className="grid grid-cols-2 gap-2 ">
                                {
                                    allblogs.slice(0, 4).map(bl => <Link to={`/public-blog-details/${bl._id}`} key={bl._id} >
                                        <figure
                                            className="relative hover:scale-105"
                                            style={{ height: '150px', width: '100%', overflow: 'hidden' }}
                                        >
                                            <img
                                                src={bl.image}
                                                alt="Description"
                                                className="block object-cover rounded-lg h-full w-full"
                                            />
                                            <figcaption
                                                className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
                                            >
                                                {bl.title}
                                            </figcaption>
                                        </figure>
                                    </Link>)
                                }


                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicBlogDetails;