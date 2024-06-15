/* eslint-disable react/prop-types */
import { IoPersonOutline } from "react-icons/io5";
const SearchCard = ({ sdata }) => {
    return (
        <div>
            <div className="px-2 flex items-center bg-base-100 rounded-xl shadow-xl">
                <div className="text-[#5D0911]">
                    <IoPersonOutline size={100} />
                </div>
                <div className="p-5">
                <tbody>
                        <tr className="">
                            <th>Name </th>
                            <td>:</td>
                            <td><h2>{sdata.name}</h2></td>
                        </tr>
                        <tr className="">
                            <th>Blood </th>
                            <td>:</td>
                            <td><h2>{sdata.blood}</h2></td>
                        </tr>
                        <tr className="">
                            <th>District</th>
                            <td>:</td>
                            <td><h3>{sdata.district}</h3></td>
                        </tr>
                        </tbody>
                </div>
               
            </div>
        </div>
    );
};

export default SearchCard;