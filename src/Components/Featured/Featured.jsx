import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const Featured = () => {
    const axiosPublic = useAxiosPublic()
    const { data: donorcard = [], isLoading } = useQuery({
        queryKey: ['donorcard'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/publicDonor`)
            return data
        }
    });
    if (isLoading) return <LoadingSpinner />
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center my-10">
                <h1 className="text-3xl text-[#5D0911] font-semibold md:text-5xl">Features Blood Request</h1>
            </div>
{/* 
            <div className="grid grid-cols-3 gap-5">
                {donorcard.filter(dcard => dcard.status === 'pending').slice(0, 3).map((item) => (
                                           
                                        ))}
            </div> */}


        </div>
    );
};

export default Featured;