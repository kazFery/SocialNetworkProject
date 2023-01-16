import { Fragment } from "react";
import image from "../../images/admin-img.png";
import './Admin.css';

export default function AdminIndex() {
    return (
        <Fragment>
            <div className="adminPages">
                <div className="container py-5">
                    <h1 className="text-center mb-0" style={{ color: "#0277CC", fontFamily: 'Julius Sans One', fontSize: '50px' }}>Social Network Project</h1>
                    <hr className="mt-0 mb-3" style={{ height: "5px", color: "#CDE4FB", backgroundColor: "#E3E9FD" }} />
                    <div className="container">
                       <img src={image} alt="image" className="rounded" style={{width: "100%"}} /> 
                    </div>    
                </div>
            </div>
        </Fragment>
    )
}