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
            console.log(data);
            return data
        },
        enabled: false,
    });
    const { data: donor = [] } = useQuery({
        queryKey: ['donor'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/Donorcount`);
            return data
        }
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
        const blood = encodeURIComponent(form.blood.value);
        setDistrict(S_district)
        setUpazila(S_upazila)
        setBlood(blood)
        setClicked(true)
    }
    const handleReset = () => {
        setDistrict('');
        setUpazila('');
        setBlood('');
        setClicked(false); 
    };
    useEffect(()=>{
        if(clicked){
            refetch()
        }
    },[clicked,refetch])
   
   
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
            <div className=" bg-cover h-[350px] md:h-[250px]  bg-[#fcdfdf] ">
            {searchData.length === 0 && (
                    <style>
                        {`
                                .section-no-cards {
                                    margin-bottom: 95px;
                                }
                            `}
                    </style>
                )}
            
                <div className=" max-w-6xl mx-auto pt-20 md:pt-40 px-10">
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

                        <select
                         name="blood" required className="select select-bordered w-full max-w-xs">
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

                        <div className="flex gap-5">
                            <input className="btn" type="submit" value='Search' />
                            <div>
                            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
               
            </div>
            <div className="max-w-6xl mx-auto rounded-lg section-no-cards mt-10 bg-gradient-to-r from-[#5D0911] to-[#ac0000]">
                 <p className="py-2 text-white px-3 font-semibold text-xl">Total Donors : {donor.Donorcount}</p>
            </div>
            
            <div className=" max-w-6xl mx-auto py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 {
                    searchData.filter(d=>d.role ==='donor').map(sdata=><SearchCard key={sdata._id} sdata={sdata}></SearchCard>)
                 }
            </div>
        </div>
    );
};

export default SearchPage;