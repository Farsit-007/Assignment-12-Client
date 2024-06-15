import WelsomeMessage from '../../../Components/WelcomeMessage/WelsomeMessage';
import useAuth from '../../../Hooks/useAuth';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const AdminDashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
   
    const { data: Count=[] } = useQuery({
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

            <div className='flex justify-center'>
                <div className="stats shadow w-[80%] mx-auto ">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>

                        
                        <div className="stat-title">Total User</div>
                        <div className="stat-value text-secondary">

                        <CountUp start={0} end={Count.Donorcount} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>

                        </div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Total Funding</div>
                        <div className="stat-value text-secondary">
                        <CountUp start={0} end={Count.fund} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>

                        </div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>


                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Blood Donation Request</div>
                        <div className="stat-value text-primary">
                            <CountUp start={0} end={Count.Donationcount} delay={0}>
                                {({ countUpRef }) => (
                                    <div>
                                        <span ref={countUpRef} />
                                    </div>
                                )}
                            </CountUp>
                        </div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;