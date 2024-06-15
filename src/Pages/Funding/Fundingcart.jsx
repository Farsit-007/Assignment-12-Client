import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_APIKEY);
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import CheckoutForm from "./CheckoutForm";
const Fundingcart = () => {
    const [showModal, setShowModal] = useState(false)
    const[funding,setFunding] = useState('')
    const { user } = useAuth()
    
    const handlePay = (e) => {
        e.preventDefault()
        const form = e.target;
        const fund = form.fund.value;
        setFunding(fund)
        setShowModal(true)
    }
    const handleCencel =()=>{
        closeModal()
    }
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <section className="">
                <div className=" bg-cover min-h-[220px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/j2jFM8RW/small-juvenile-bedroom-arrangement-1.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center  ">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-6xl xl:max-w-3xl  playfair ">My Booking Details</h1>
                    </div>
                </div>
            </section>

            <div className="w-[70%] mx-auto border mt-10">
                <form onSubmit={handlePay} className="space-y-3 my-4">
                    <div className="flex flex-col md:flex-row  gap-3">
                        <input disabled type="text" placeholder={user?.displayName} className="input input-bordered w-full " />
                        <input disabled type="text" placeholder={user?.email} className="input input-bordered w-full " />
                    </div>
                    <div>
                        <input type="text" placeholder='amount' name='fund' className="input input-bordered w-full "  required/>
                    </div>
                    <div className="flex justify-around">
                        <input className="btn " type="submit" value='Confirm' />
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed  inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative  w-[400px]  p-6 my-8 mx-auto bg-[#18181b6c] border border-[#cfaf45] rounded-sm">
                        <div className="">
                           <div className="text-center py-4">
                           <h3 className="text-3xl font-bold text-[#cfaf45]  leading-6 ">Funding</h3>
                           </div>
                            <p>Name : {user?.displayName}</p>
                            <p>Email : {user?.email}</p>
                            <p>Fund : ${funding}</p>
                            <div className="">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm handleCencel={handleCencel} closeModal={closeModal} funding={funding}></CheckoutForm>
                                </Elements>
                            </div>
                        </div>
                      
                    </div>
                </div>
            )}


        </div>
    );
};

export default Fundingcart;