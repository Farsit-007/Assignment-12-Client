import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const DonorCreateReq = () => {
    const { user, loading } = useAuth();
    const [value, setValue] = useState(dayjs());
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const district = form.district.value;
        const upazila = form.upazila.value
        const selectedDistrict = districts.find(d => d.id === district);
        const selectedUpazila = filteredUpazilas.find(u => u.id === upazila);

        const ReqName = user?.displayName;
        const ReqEmail = user?.email;
        const PName = form.PName.value;
        const HospitalName = form.HospitalName.value;
        const address = form.address.value
        const blood = form.blood.value;
        const S_district = selectedDistrict?.name;
        const S_upazila = selectedUpazila?.name;
        const message = form.message.value;
        const time = value.format('DD/MM/YYYY hh:mm A');
        const donationReq = {
            RequestName : ReqName,
            RequestEmail: ReqEmail,
            RecipientName : PName,
            HospitalName : HospitalName,
            Address : address,
            blood : blood,
            district : S_district,
            upazila : S_upazila,
            message : message, 
            time : time,
            status : 'pending'
        }
        const {data} = await axiosSecure.post('/create-donation-request',donationReq)
        if(data.insertedId){
            navigate('/dashboard')
        }
        form.reset();
    }

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
    if (loading) return <LoadingSpinner />
    return (
        <div className="flex justify-center bg-slate-400 items-center font-Mulish w-full bg-cover">
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col md:w-[800px] mt-8  pb-4 pt-2 rounded-xl bg-opacity-5 backdrop-blur-3xl bg-transparent-white">

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm">Requester Name</label>
                                    <input
                                        type="text"
                                        name='ReqName'
                                        disabled
                                        required
                                        defaultValue={user?.displayName}
                                        placeholder="Enter your Name"
                                        className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block mb-2 text-sm">Requester Email</label>
                                    <input
                                        type="email"
                                        disabled
                                        required
                                        defaultValue={user?.email}
                                        name='ReqEmail'
                                        placeholder="Enter your email address"
                                        className="w-full px-3 py-2 border outline-none rounded-md border-gray-200 bg-transparent"
                                    />

                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm">Recipient Name</label>
                                    <input
                                        type="text"
                                        name='PName'
                                        required
                                        placeholder="Enter your Name"
                                        className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="district" className="block mb-2 text-sm">Districts</label>
                                    <select
                                        className="select w-full"
                                        name='district'
                                        required
                                        onChange={handleDistrictChange}
                                    >
                                        <option disabled selected value=''>District</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.id}>{d?.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="w-full">
                                    <label htmlFor="upazila" className="block mb-2 text-sm">Upazila</label>
                                    <select
                                        className="select w-full"
                                        name="upazila"
                                        required
                                    >
                                        <option disabled selected value=''>Upazila</option>
                                        {filteredUpazilas.map(upazila => (
                                            <option key={upazila.id} value={upazila.id}>{upazila?.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="flex flex-col items-center md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm">Hospital Name</label>
                                    <input
                                        type="text"
                                        required
                                        name='HospitalName'
                                        placeholder="Enter your Name"
                                        className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="blood" className="block mb-2 text-sm">Blood Group</label>
                                    <select
                                        className="select w-full"
                                        name="blood"
                                        required
                                    >
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
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm">Full Adress</label>
                                    <input
                                        type="text"
                                        name='address'
                                        required
                                        placeholder="Enter your Name"
                                        className="w-full px-3 py-2 border outline-none rounded-md bg-transparent"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full ">
                                    <label htmlFor="name" className="block mb-2 text-sm">Date & Time</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker

                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}></DateTimePicker>
                                    </LocalizationProvider>
                                    <input
                                        type="hidden"
                                        name="dateTime"
                                        value={value ? value.format('YYYY-MM-DD hh:mm:ss A') : ''}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm">Request Message</label>
                                    <textarea name="message" required rows={3} className="textarea w-full textarea-bordered" placeholder="Bio"></textarea>
                                </div>
                                
                            </div>
                            
                        </div>


                        <div>
                            <input type="submit" value="Make Request" className="w-full btn bg-blue-500 hover:bg-blue-700 border-none text-white" />
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default DonorCreateReq;