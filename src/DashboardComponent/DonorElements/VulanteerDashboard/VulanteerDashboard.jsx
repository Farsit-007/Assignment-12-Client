import WelsomeMessage from '../../../Components/WelcomeMessage/WelsomeMessage';
import useAuth from '../../../Hooks/useAuth';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { RiRefund2Fill } from 'react-icons/ri';
import { IoPerson } from "react-icons/io5";
const VulanteerDashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: Count = [] } = useQuery({
        queryKey: ['fundCount'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/count');
            return data;
        },
    });

    return (
        <div>
            <div>
                <WelsomeMessage message={`${user.displayName} Welcome To Blood Donation`}></WelsomeMessage>
            </div>

            <div className='mx-5 md:mx-10 lg:mx-5  flex flex-col lg:flex-row justify-between gap-5 lg:gap-0'>
                <div className='lg:w-[31%]  rounded-xl shadow bg-gradient-to-r  from-[#5D0911] to-[#ac0000] h-40'>
                    <div className="text-3xl p-4 px-8 font-bold text-rose-100">Total User</div>
                    <div className='flex justify-between  items-center  px-8'>
                        <div className="text-rose-100">
                            <IoPerson size={65}/>
                        </div>
                        <div className=" text-rose-100 font-bold text-4xl">

                            <CountUp start={0} end={Count.Donorcount} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>

                        </div>
                    </div>

                </div>
                <div className='lg:w-[31%] rounded-xl shadow bg-gradient-to-r  from-[#5D0911] to-[#ac0000] h-40'>
                    < div className="text-3xl p-4 px-8 font-bold text-rose-100">Total Funding</div>
                    <div className='flex justify-between  items-center  px-8'>
                        <div className="text-rose-100">
                            <RiRefund2Fill size={65} />
                        </div>
                        <div className=" text-rose-100 flex font-bold text-4xl">

                            $
                            <CountUp start={0} end={Count.fund} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>
                        </div>
                    </div>


                </div>
                <div className='lg:w-[31%] rounded-xl shadow bg-gradient-to-r  from-[#5D0911] to-[#ac0000] h-40'>
                    < div className=" text-3xl p-4 px-8 font-bold text-rose-100">Donation Request</div>

                    <div className='flex justify-between  items-center  px-8'>
                        <div className="text-rose-100">
                            <BiSolidDonateBlood size={65} />
                        </div>
                        <div className=" text-rose-100 font-bold text-4xl">


                            <CountUp start={0} end={Count.Donationcount} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default VulanteerDashboard;