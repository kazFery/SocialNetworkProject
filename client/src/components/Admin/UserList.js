import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function AdminUserList() {
    return (
        <Fragment>
            <div className="container py-5 bg-white">
                <h1 className="text-center">User List</h1>
                <Link to={"/admin/adduser"} className="btn btn-success">Add User</Link>

                <table className="table table-light table-hover mt-3">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="align-middle">Marcelo Di Liscia</th>
                            <td className="align-middle">marcelo.diliscia@gmail.com</td>
                            <td className="text-center align-middle">user</td>
                            <td className="d-flex justify-content-center align-items-center">
                                <Link to={"/admin/userlist/edituser"} className="btn btn-warning mx-1">Edit</Link>
                                <Link to={"/admin/userlist/deleteuser"} className="btn btn-danger mx-1">Delete</Link>
                                <Link to={"/admin/userlist/userposts"} className="btn btn-primary mx-1">Posts</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}