import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import image from "../../images/default-image.jpg";
import AuthService from "../../services/auth.service";
import UserDataService from "../../services/UserService";
import moment from "moment";

export default function Account() {
  const currentUser = AuthService.getCurrentUser();
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser.id);
    UserDataService.getUserInfo(currentUser.id)
      .then((res) => {
        console.log(currentUser.id);
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Fragment>
      <div className="container bg-white py-4">
        <header className="text-center py-2">
          <h1 className="mb-0">User Account</h1>
        </header>
        <main className="mx-auto pt-3" style={{ width: "60%" }}>
          <div className="row py-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="form-label" style={{ fontSize: "3vmin" }}>
                Profile Image
              </label>
            </div>
            <div className="col-sm-8 d-flex justify-content-center">
              {user.userImage ? (
                <img
                  className="img-thumbnail rounded"
                  alt="user account"
                  src={"https://snp-project.s3.amazonaws.com/" + user.userImage}
                  width="100px"
                  height="100px"
                />
              ) : (
                <img
                  src={image}
                  alt="user account"
                  style={{ width: "160px" }}
                />
              )}
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm-4">
              <label
                className="form-label"
                id="firstName"
                style={{ fontSize: "3vmin" }}
              >
                First Name
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="First Name"
                value={user.firstName}
                readOnly
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm-4">
              <label
                className="form-label"
                id="LastName"
                style={{ fontSize: "3vmin" }}
              >
                Last Name
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                id="LastName"
                className="form-control"
                placeholder="Last Name"
                value={user.lastName}
                readOnly
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm-4">
              <label
                className="form-label"
                id="birthDate"
                style={{ fontSize: "3vmin" }}
              >
                Birthdate
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="text"
                id="birthDate"
                className="form-control"
                value={moment(user.birthDate).format("YYYY/MM/DD")}
                readOnly
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm-4">
              <label
                className="form-label"
                id="password"
                style={{ fontSize: "3vmin" }}
              >
                Password
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={user.password}
                readOnly
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-sm-4">
              <label
                className="form-label"
                id="email"
                style={{ fontSize: "3vmin" }}
              >
                Email
              </label>
            </div>
            <div className="col-sm-8">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="email@site.com"
                value={user.email}
                readOnly
              />
            </div>
          </div>
          <div className="d-flex justify-content-end py-2 pt-4">
            <Link
              to="/"
              className="btn btn-primary mx-2 fw-bold"
              style={{ fontSize: "20px", width: "100px" }}
            >
              Home
            </Link>
            <Link
              to="/account/edit"
              className="btn btn-primary mx-2 fw-bold"
              style={{ fontSize: "20px" }}
            >
              Edit Account
            </Link>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
