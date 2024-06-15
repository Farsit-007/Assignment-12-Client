import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const Main = () => {
    return (
        <div>
             <div className="">
                <Header></Header>
            </div>
            <div className="">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;