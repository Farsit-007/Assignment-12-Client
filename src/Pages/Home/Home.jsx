import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import ContactUs from "../../Components/ContactUs/ContactUs";

const Home = () => {
    return (
        <div>
            <Helmet>
            <title> Hope In Drops | Home</title>
            </Helmet>
            <Banner></Banner>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;