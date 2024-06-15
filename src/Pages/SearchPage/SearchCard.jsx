/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SearchCard = ({sdata}) => {
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{sdata.RecipientName}</h2>
                    <h2 className="card-title">{sdata.HospitalName}</h2>
                    <h2 className="card-title">{sdata.blood}</h2>
                    <p>{sdata.message}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/donationreq/${sdata._id}`} className="btn btn-primary">Donate</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;