/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";

const image_hosting_key = "6c6d9827b1a74ce39e723830557272b6";
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, profileUpdate } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = async (data) => {
        const { userEmail, userPassword, userName, image, blood, upazila, district } = data;
        const selectedDistrict = districts.find((d) => d.id === district);
        const selectedUpazila = filteredUpazilas.find((u) => u.id === upazila);
        const S_district = selectedDistrict?.name;
        const S_upazila = selectedUpazila?.name;
        const image_File = new FormData();
        image_File.append("image", image[0]);

        const res = await axiosPublic.post(image_hosting_Api, image_File, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        createUser(userEmail, userPassword)
            .then(async (result) => {
                const userInfo = {
                    email: userEmail,
                    name: userName,
                    image: res.data?.data?.display_url,
                    blood: blood,
                    district: S_district,
                    upazila: S_upazila,
                    status: "active",
                    role: "donor",
                };
                profileUpdate(userName, res.data.data.display_url).then(async () => {
                    navigate(location.state ? location.state : "/");
                    reset();
                });
                try {
                    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, userInfo);
                    return data;
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                if (error.message) {
                    console.error("User already exists");
                }
            });
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "userPassword") {
                setPassword(value.userPassword);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        fetch("districts.json")
            .then((res) => res.json())
            .then((data) => {
                setDistricts(data);
            });

        fetch("upazilas.json")
            .then((res) => res.json())
            .then((data) => {
                setUpazilas(data);
            });
    }, []);

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value;
        const filtered = upazilas.filter((upazila) => upazila.district_id === selectedDistrictId);
        setFilteredUpazilas(filtered);
    };

    return (
        <div
            className="flex justify-center items-center  h-[900px]  md:h-screen font-Mulish w-full bg-cover"
            style={{ backgroundImage: `url(https://i.ibb.co/vQyz7LV/9012851.jpg)` }}
        >
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col md:w-[800px]  p-10 pb-4 pt-2 rounded-xl bg-opacity-5 backdrop-blur-3xl bg-transparent-white">
                    <div className="mb-4 text-center border-b-2">
                        <h1 className="my-2 text-3xl text-rose-100 font-bold">Register your account</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full ">
                                    <label htmlFor="name" className="block mb-2 text-rose-100 text-sm">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your Name"
                                        className="w-full text-rose-100 px-3 py-2 border border-rose-100 outline-none rounded-md bg-transparent"
                                        {...register("userName")}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block mb-2 text-rose-100 text-sm">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full text-rose-100 px-3 py-2 border outline-none rounded-md border-gray-200 bg-transparent"
                                        {...register("userEmail", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid Email",
                                            },
                                        })}
                                    />
                                    {errors.userEmail && <small className="text-red-500 font-bold">{errors.userEmail.message}</small>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <label htmlFor="district" className="block text-rose-100 mb-2 text-sm">
                                        Districts
                                    </label>
                                    <select
                                        className="select  w-full"
                                        {...register("district", {
                                            required: "Select District",
                                        })}
                                        onChange={handleDistrictChange}
                                    >
                                        <option disabled selected value="">
                                            Districts
                                        </option>
                                        {districts.map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && <small className="text-red-500 font-bold">{errors.district.message}</small>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="upazila" className="block text-rose-100 mb-2 text-sm">
                                        Upazila
                                    </label>
                                    <select
                                        className="select w-full"
                                        {...register("upazila", {
                                            required: "Select Upazila",
                                        })}
                                    >
                                        <option disabled selected value="">
                                            Upazila
                                        </option>
                                        {filteredUpazilas.map((upazila) => (
                                            <option key={upazila.id} value={upazila.id}>
                                                {upazila.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.upazila && <small className="text-red-500 font-bold">{errors.upazila.message}</small>}
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:flex-row gap-5">
                                <div className="w-full  text-rose-100">
                                    <input
                                        {...register("image", {
                                            required: "Image is required",
                                        })}
                                        type="file"
                                        className="p-2 w-full  max-w-xs"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="name" className="block text-rose-100 mb-2 text-sm">
                                        Blood Group
                                    </label>
                                    <select
                                        className="select w-full"
                                        {...register("blood", {
                                            required: "Select Blood Group",
                                        })}
                                    >
                                        <option disabled selected>
                                            Blood Group
                                        </option>
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                    </select>
                                    {errors.blood && <small className="text-red-500 font-bold">{errors.blood.message}</small>}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="text-sm text-rose-100">
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={show ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full text-rose-100 outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent"
                                            {...register("userPassword", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])/,
                                                    message: "At least one lowercase letter and one uppercase letter",
                                                },
                                            })}
                                        />
                                        <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%]">
                                            {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                        </span>
                                    </div>
                                    {errors.userPassword && <small className="text-red-500 font-bold">{errors.userPassword.message}</small>}
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="ConfirmPassword" className="text-sm text-rose-100">
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={show ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="w-full text-rose-100 outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent"
                                            {...register("confirmedPassword", {
                                                required: "Confirm your password",
                                                validate: (value) => value === password || "Passwords do not match",
                                            })}
                                        />
                                        <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%]">
                                            {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                        </span>
                                    </div>
                                    {errors.confirmedPassword && (
                                        <small className="text-red-500 font-bold">{errors.confirmedPassword.message}</small>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <input
                                type="submit"
                                value="Register"
                                className="w-full btn text-xl transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]"
                            />
                        </div>
                        <p className="p-2 text-sm text-center text-rose-100">
                            Already have an account?
                            <Link to="/login" className="hover:underline text-red-600 pl-1 font-extrabold">
                                Login
                            </Link>
                            .
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
