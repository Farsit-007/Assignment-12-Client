import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const image_hosting_key = "6c6d9827b1a74ce39e723830557272b6";
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const { user, profileUpdate, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
            return data
        }
    });
    console.log(users.image);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const userName = form.userName.value;
        const images = form.image.files[0] || users?.image;
        const blood = form.blood.value;
        const district = form.district.value;
        const upazila = form.upazila.value
        const selectedDistrict = districts.find(d => d.id === district);
        const selectedUpazila = filteredUpazilas.find(u => u.id === upazila);
        const S_district = selectedDistrict?.name;
        const S_upazila = selectedUpazila?.name;
        const image_File = new FormData();
        image_File.append("image", images);

        const res = await axiosPublic.post(image_hosting_Api, image_File, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const userInfo = {
            name: userName,
            image: res.data?.data?.display_url || users.image,
            blood: blood,
            district: S_district || users.district,
            upazila: S_upazila || users.upazila
        }
        profileUpdate(userName, res.data.data.display_url)
            .then(async () => {
                try {
                    const { data } = await axiosSecure.patch(`/updateuser/${users.email}`, userInfo)
                    if (data.modifiedCount > 0) {
                        setIsEditing(false)
                        refetch()
                    }
                } catch (error) {
                    console.log(error);
                }
            });

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
        refetch()
    };
    if (isLoading || loading) return <LoadingSpinner />
    return (
        <div className="mx-5 mt-4">

            <div className="flex justify-center items-center ">
                <div className="flex  flex-col w-full  pb-4 pt-2 rounded-xl bg-opacity-5 backdrop-blur-3xl bg-transparent-white">

                    <div className="mb-4 bg-gradient-to-r rounded-lg from-[#5D0911] to-[#ac0000] text-center">
                        <div className="flex justify-end px-5 pt-2">
                            <button className="btn border-rose-100 text-rose-100 bg-transparent font-bold text-xl rounded-md" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="flex flex-col gap-5 items-center justify-center">
                        <div className="avatar">
                            <div className="w-40 rounded-full ring ring-rose-100 ring-offset-base-100 ring-offset-2">
                                <img src={`${users?.image}`} alt="Profile" />
                            </div>

                        </div>
                        <div className="badge bg-rose-100 font-semibold text-lg text-[#5D0911] mb-4 p-3">
                        {users.role === 'admin' && 'Admin' || users.role === 'donor' && 'Donor' || users.role === 'volunteer' && 'Volunteer'}
                        </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2 px-2">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="name" className="block text-[#5D0911] mb-2 text-sm">Username</label>
                                    <input
                                        type="text"
                                        defaultValue={users?.name}
                                        name='userName'
                                        placeholder="Enter your Name"
                                        className="w-full text-[#5D0911] px-3 py-2 border outline-none rounded-md bg-transparent"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block text-[#5D0911] mb-2 text-sm">Email address</label>
                                    <input
                                        type="email"
                                        disabled
                                        name='userEmail'
                                        defaultValue={users?.email}
                                        placeholder="Enter your email address"
                                        className="w-full text-[#5D0911] px-3 py-2 border outline-none rounded-md border-gray-200 bg-transparent"
                                    />

                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="district" className="block mb-2 text-[#5D0911] text-sm">Districts</label>
                                    <select
                                        className="select text-[#5D0911] w-full"
                                        name='district'
                                        onChange={handleDistrictChange}
                                        disabled={!isEditing}
                                    >
                                        <option disabled selected>{users?.district}</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.id}>{d?.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="w-full">
                                    <label htmlFor="upazila" className="block mb-2 text-[#5D0911] text-sm">Upazila</label>
                                    <select
                                        className="select  text-[#5D0911] w-full"
                                        name="upazila"
                                        disabled={!isEditing}
                                    >
                                        <option disabled selected>{users?.upazila}</option>
                                        {filteredUpazilas.map(upazila => (
                                            <option key={upazila.id} value={upazila.id}>{upazila?.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center md:flex-row gap-5">
                                <div className="w-full">

                                    <div className='file_upload mt-5 px-5 py-2 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max mx-auto text-center'>
                                            <label>
                                                <input
                                                    className='text-sm  w-36 hidden'
                                                    type='file'
                                                    name='image'
                                                    id='image'
                                                    disabled={!isEditing}
                                                    hidden
                                                />
                                                <div className='bg-[#5D0911] text-rose-100 border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#5D0911]'>
                                                    Upload Image
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="blood" className="block mb-2 text-[#5D0911] text-sm">Blood Group</label>
                                    <select
                                        className="select text-[#5D0911] w-full"
                                        name="blood"
                                        disabled={!isEditing}
                                    >
                                        <option disabled selected>{users?.blood}</option>
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
                        </div>
                        {isEditing && (
                            <div className="px-2">
                                <input type="submit" value="Update" className="w-full mt-1 btn text-xl transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]" />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
