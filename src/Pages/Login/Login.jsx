import {  useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
const Login = () => {
    const { loginUser,user,loading} = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
   
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const togglePasswordVisibility = () => {
        setShow(!show);
    };
 
    const onSubmit = (data) => {
        const { userEmail, userPassword} = data;
            loginUser(userEmail, userPassword)
                .then(result => {
                    // toast.success("Logged in successfully");
               
                        navigate(location.state ? location.state : '/');
                        reset();
               
                })
                .catch(error => {
                    if (error.message) {
                        // toast.error("Wrong email/password");
                        reset();
                    }
                });
  
    }
   
    return (
        <div className="flex justify-center  items-center min-h-screen" style={{ backgroundImage: `url(https://i.ibb.co/Sf0ws3p/2151004024-1.webp)` }}>
            <div className="flex  flex-col animate__animated animate__zoomIn bg-opacity-5 backdrop-blur-3xl bg-transparent-white  md:w-[450px] p-10 pb-4 pt-2 rounded-xl ">
                <div className="mb-4 text-center border-b-2">
                    <h1 className="my-2 text-3xl font-bold  ">Login</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">

                        <div>
                            <label htmlFor="email" className="block   mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address" className="w-full outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent " {...register("userEmail",
                                {
                                    required: true,
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid Email"
                                    }
                                }
                            )} />
                            {errors.userEmail && <small className="text-red-500 font-bold">{errors.userEmail.message}</small>}

                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm  ">Password</label>

                            </div>
                            <div className="relative">
                                <input type={show ? "text" : "password"} placeholder="Enter your password" className="w-full px-3 py-2 outline-none border rounded-md border-gray-200 bg-transparent  "
                                    {...register("userPassword",
                                        {
                                            required: true,
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])/,
                                                message: "At least one lowercase letter and one uppercase letter"
                                            }
                                        }
                                    )}
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%]">
                                    {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </span>

                            </div>
                            {errors.userPassword && <small className="text-red-500 font-bold">{errors.userPassword.message}</small>}
                        </div>
                        

                    </div>
                    <div className="pt-1">
                        <div>
                            <button type="submit" className="w-full px-8 py-2 font-semibold rounded-md bg-blue-500  text-xl ">Login</button>
                        </div>

                    </div>
                </form>

                <p className="p-6 text-sm text-center text-gray-300">Don't have any account?
                    <Link to="/register" className="hover:underline text-red-600 pl-1 font-extrabold">Register</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;