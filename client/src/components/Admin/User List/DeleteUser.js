import { Fragment } from 'react';
import { Link } from "react-router-dom";
import image from "../../../images/default-image.jpg";

export default function DeleteUser() {
    return (
        <Fragment>
            <div className="container">
                <div className="card border-0 pt-3">
                    <div className="card-header py-4">
                        <h1 className="text-center">
                            Delete User
                        </h1>
                    </div>
                    <div className="card-body">
                        {/* Form starts here, change div to Form */}
                        <form method="post" className="g-3 m-5 mx-auto" style={{ width: "60%" }}>
                            <div className="form-group row align-middle">
                                <div className="col-sm-4 col-form-label fw-bold d-flex align-items-center">
                                    <input
                                        // filename={file}
                                        // onChange={fileSelected}
                                        // ref={inputFileRef}
                                        type="file"
                                        id="file"
                                        accept="images/*"
                                    ></input>
                                    <label for="file" className="px-3">Choose a profile picture</label>
                                </div>

                                <div className="col-sm-8 d-flex justify-content-center">
                                    <img src={image} alt="defaylt profile image" style={{ width: "35%" }} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="firstName" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>First Name</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        // value={password}
                                        placeholder="First Name"
                                    // onChange={onChangePassword}
                                    // validations={[required, validPassword]}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="lastName" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Last Name</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        // value={password}
                                        placeholder="Last Name"
                                    // onChange={onChangePassword}
                                    // validations={[required, validPassword]}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Email</label>
                                <div className="col-sm-8">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        // value={password}
                                        placeholder="Email"
                                    // onChange={onChangePassword}
                                    // validations={[required, validPassword]}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="role" className="col-sm-4 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Role</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="role"
                                        // value={role}
                                        placeholder="Role"
                                    // onChange={onChangePassword}
                                    // validations={[required, validPassword]}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger fw-bold p-2" style={{ width: "5rem" }}>Delete</button>
                                {/* <input type="button" name="cancel" value="Cancel" onClick={"history.back"}/> */}
                                <Link to={"/admin/userlist"} className="btn btn-secondary fw-bold p-2 ml-4" style={{ width: "5rem" }}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}