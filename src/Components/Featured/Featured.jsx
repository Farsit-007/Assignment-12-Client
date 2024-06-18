
const Featured = () => {

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center my-10">
                <h1 className="text-3xl text-[#5D0911] font-bold md:text-5xl">Features Donation Process</h1>
            </div>
            <div className="grid  md:grid-cols-2 lg:grid-cols-3  gap-5">
                <div className="card card-compact bg-base-100 shadow-xl">
                
                        <figure className="" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                            <img src="https://i.ibb.co/Btzk12s/process-1-d06b71e382902264bf71.jpg"
                                className="block object-cover rounded-lg h-full w-full " />
                            
                        </figure>
                        <div className="absolute top-3 left-3">
                            <div className=" w-16 h-16 flex justify-center items-center rounded-full font-extrabold bg-[#5D0911] text-rose-100 text-4xl">1</div>
                        </div>
                    
                    <div className="card-body">
                        <h2 className="card-title">REGISTRATION</h2>
                        <p className="text-lg">You need to complete a very simple registration form. Which contains all required contact information to enter in the donation process.</p>

                    </div>
                </div>
                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className="" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                        <img
                            src="https://i.ibb.co/df6Wb56/Blood-Donor-Privileges-Malaysia.png"
                            className="block object-cover rounded-lg h-full w-full "
                        />

                    </figure>
                    <div className="absolute top-3 left-3">
                            <div className=" w-16 h-16 flex justify-center items-center rounded-full font-extrabold bg-[#5D0911] text-rose-100 text-4xl">2</div>
                        </div>
                    
                    <div className="card-body">
                        <h2 className="card-title">SCREENING</h2>
                        <p className="text-lg">A drop of blood from your finger will take for simple test to ensure that your blood iron levels are proper enough for donation process.</p>

                    </div>
                </div>
                <div className="card card-compact  bg-base-100 shadow-xl">
                    <figure className="" style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                        <img
                            src="https://i.ibb.co/DwTfcnk/230614-Blood-Donation-Blog-cover.webp"
                            className="block object-cover rounded-lg h-full w-full "
                        />

                    </figure>
                    <div className="absolute top-3 left-3">
                            <div className=" w-16 h-16 flex justify-center items-center rounded-full font-extrabold bg-[#5D0911] text-rose-100 text-4xl">3</div>
                        </div>
                    
                    <div className="card-body">
                        <h2 className="card-title">DONATION</h2>
                        <p className="text-lg">After ensuring and passed screening test successfully you will be directed to a donor bed for donation. It will take only 6-10 minutes.</p>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Featured;