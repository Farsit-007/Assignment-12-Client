import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const BlogDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: Bdetails = [], isLoading } = useQuery({
        queryKey: ['Bdetails', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/publicBlog-Details/${id}`)
            return data
        }
    });
    if (isLoading ) return <LoadingSpinner />;
    return (
        <div className="mx-4 md:mx-5 lg:mx-8 ">
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
    );
};

export default BlogDetails;