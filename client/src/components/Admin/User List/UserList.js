import React, { Fragment, useState, useEffect } from "react";
import AdminDataService from "../../../services/AdminService";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    debugger;
    AdminDataService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  return (
    <Fragment>
      <div className="container py-2">
        <div className="list row">
          <div className="col-md-6">
            <h1 className="my-2">User list</h1>

            <ul className="list-group">
              {users &&
                users.map((user, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveUser(user, index)}
                    key={index}
                  >
                    {user.email}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentUser ? (
              <div className="container py-2 mt-5">
                <h4>User</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentUser.firstName + "  " + currentUser.lastName}
                </div>
                <div>
                  <label>
                    <strong>Email:</strong>
                  </label>{" "}
                  {currentUser.email}
                </div>
                <div>
                  <label>
                    <strong>Role:</strong>
                  </label>{" "}
                  {currentUser.role}
                </div>

                <Link
                  to={"/admin/user/" + currentUser.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div className="container py-2 mt-5">
                <br />
                <p>Click on a User</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
