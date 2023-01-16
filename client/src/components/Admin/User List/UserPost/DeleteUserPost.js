import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';

export default function DeleteUserPost() {
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
                                readOnly
                                className="form-control"
                            />
                        </div>

                        <div className="mt-3 d-flex justify-content-between">
                            <button
                                className="btn btn-danger rounded-4 fw-bold"
                                type="submit"
                                style={{ width: "5rem" }}
                            >
                                Delete
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