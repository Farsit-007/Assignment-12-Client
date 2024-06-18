import { Link } from "react-router-dom";
import bg from '../../../public/bg.jpg'
const Banner = () => {
    return (
        <div className='w-full font-Cormorant flex justify-start items-center min-h-screen bg-cover ' style={{ backgroundImage: `url(${bg})` }}>

            <div className='max-w-6xl mx-auto z-10  text-white'>
                <div data-aos="fade-up"
                    data-aos-duration="1000" className='bg-[#5d09115e] w-[95%] md:w-[70%] shadow mx-auto rounded-lg mt-20 pt-5 p-10 ' >
                    <h1 className='text-4xl py-2 text-rose-100  text-center font-bold '>
                        Save Lives with Every Donation
                    </h1>
                    <p className="text-2xl text-center">Join our passionate community of heroes, donate blood, and bring hope with every drop!</p>

                </div>
                <div className="w-[70%] mx-auto mt-5 flex justify-center gap-3 md:gap-5">
                    <Link to='/register' className='transition-colors btn duration-300 transform  text-rose-100 badge bg-[#5D0911] md:text-2xl hover:bg-rose-100 rounded-md  hover:text-[#5D0911]'>
                        Join as a Donor
                    </Link>
                    <Link to='/searchblood' className='transition-colors btn duration-300 transform  text-rose-100 badge bg-[#5D0911] md:text-2xl hover:bg-rose-100 rounded-md  hover:text-[#5D0911] '>
                        Search Donors
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;