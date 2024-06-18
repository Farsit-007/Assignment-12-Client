import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_APIKEY);
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";
const Fundingcart = () => {
    const [showModal, setShowModal] = useState(false)
    const [funding, setFunding] = useState('')
    const { user } = useAuth()

    const handlePay = (e) => {
        e.preventDefault()
        const form = e.target;
        const fund = form.fund.value;
        setFunding(fund)
        setShowModal(true)
    }
    const handleCencel = () => {
        closeModal()
    }
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex items-center h-[100vh] md:h-[100vh]">

            <Helmet>
                <title> Hope In Drops | Funding</title>
            </Helmet>
            <div className="w-[80%] md:w-[70%]  mx-auto mt-20  rounded-2xl my-2 p-5 md:px-16 bg-gradient-to-r  from-[#5D0911] to-[#ac0000] border">
                <h1 className="text-4xl text-white text-center pt-5 pb-8 font-bold leading-none sm:text-5xl xl:max-w-3xl  playfair ">Donation Details</h1>
                <form onSubmit={handlePay} className="space-y-6 pb-8 my-4">
                    <div className="flex flex-col md:flex-row  gap-3">
                        <input disabled type="text" placeholder={user?.displayName} className="input input-bordered w-full " />
                        <input disabled type="text" placeholder={user?.email} className="input input-bordered  w-full " />

                    </div>
                    <div>
                        <input type="text" placeholder='amount' name='fund' className="input input-bordered w-full " required />
                    </div>
                    <div className="flex justify-around">
                        <input className="btn w-full" type="submit" value=' Donate' />
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed  inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative  w-[400px]  p-6 my-8 mx-auto bg-gradient-to-r  from-[#5D0911] to-[#ac0000] border  rounded-sm">
                        <div className="text-rose-100 ">
                            <div className="text-center py-4">
                                <h3 className="text-3xl font-bold text-rose-100  leading-6 ">Funding</h3>
                            </div>
                            <div className="space-y-2 py-1">
                                <p>Name : {user?.displayName}</p>
                                <p>Email : {user?.email}</p>
                                <p>Fund : ${funding}</p>
                            </div>
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