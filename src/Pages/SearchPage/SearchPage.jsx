import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SearchCard from "./SearchCard";

const SearchPage = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const[blood,setBlood] = useState('')
    const[clicked,setClicked]=useState(false)
    const axiosPublic = useAxiosPublic() 
    const { data: searchData = [] ,refetch} = useQuery({
        queryKey: ['searchData ',district,upazila,blood],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/searchdata?district=${district}&upazila=${upazila}&blood=${blood}`);
            return data
        },
        enabled: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const district = form.district.value;
        const upazila = form.upazila.value
        const selectedDistrict = districts.find(d => d.id === district);
        const selectedUpazila = filteredUpazilas.find(u => u.id === upazila);
        const S_district = selectedDistrict?.name;
        const S_upazila = selectedUpazila?.name;
        const blood = form.blood.value;
        setDistrict(S_district)
        setUpazila(S_upazila)
        setBlood(blood)
        setClicked(true)
    }
    useEffect(()=>{
        if(clicked){
            refetch()
        }
    },[clicked])
   
   
    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => {
                setDistricts(data);
            });

        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => {
                setUpazilas(data);
            });
    }, []);

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        const filtered = upazilas.filter(upazila => upazila.district_id === selectedDistrictId);
        setFilteredUpazilas(filtered);
    };
    return (
        <div>
            <div className=" bg-cover max-h-[200px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>
                <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center  text-gray-900">
                    <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-6xl xl:max-w-3xl text-white playfair ">My Booking Details</h1>
                </div>
            </div>
            <div className="py-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5">

                        <select name='district'
                            required
                            onChange={handleDistrictChange} className="select select-bordered w-full max-w-xs">
                            <option disabled selected value=''>District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id}>{d?.name}</option>
                            ))}
                        </select>

                        <select
                            name="upazila" required className="select select-bordered w-full max-w-xs">
                            <option disabled selected value=''>Upazila</option>
                            {filteredUpazilas.map(upazila => (
                                <option key={upazila.id} value={upazila.id}>{upazila?.name}</option>
                            ))}
                        </select>

                        <select name="blood" required className="select select-bordered w-full max-w-xs">
                            <option disabled selected value=''>Blood</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>

                        <div>
                            <input className="btn" type="submit" value='Search' />
                        </div>
                    </div>
                </form>
            </div>
            <div className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 {
                    searchData.map(sdata=><SearchCard key={sdata._id} sdata={sdata}></SearchCard>)
                 }
            </div>
        </div>
    );
};

export default SearchPage;