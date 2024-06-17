import { Link } from "react-router-dom";
import { GiBlood } from "react-icons/gi";
const ErrorPage = () => {
    return (
        <div>
            <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center w-[60%]">
                    <GiBlood size={220} className="text-[#5D0911]"/>
                    <p className="text-3xl">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <Link to='/' rel="noopener noreferrer" href="#" className="px-8 font-semibold btn text-xl transition-colors duration-300 transform  text-rose-100 badge bg-[#5D0911] hover:bg-rose-100 rounded-md  hover:text-[#5D0911]">Back to homepage</Link>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;