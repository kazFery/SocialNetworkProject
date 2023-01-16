import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';

export default function EditUserPost() {
let navigate = useNavigate();

    return (
        <Fragment>
            <div className="container bg-white py-4">
                <div className="mx-auto" style={{ width: '60%' }}>
                    <h1 className="text-center">Edit User Post</h1>
                    <form>
                        <div className="form-group mt-3 m-auto">
                            <textarea
                                rows={10}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mt-2" style={{ width: "15%", border: "none" }}>
                            <select className="form-select" id="postPrivacy">
                                <option value="P" selected>
                                    Public
                                </option>
                                <option value="F">Friends</option>
                                <option value="CF">Close Friends</option>
                            </select>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                            <input
                                // filename={file}
                                // onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                id="file"
                                accept="images/*"
                            ></input>
                            <label for="file">Update Image</label>

                            <button
                                className="btn btn-success rounded-4 fw-bold"
                                type="submit"
                                style={{ width: "5rem" }}
                            >
                                Post
                            </button>
                            
                            <button
                                className="btn rounded-4 btn-secondary fw-bold"
                                type="cancel"
                                onClick={navigate("/admin/userlist/userposts")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}