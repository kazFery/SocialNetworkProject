import { Fragment, useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from "../../images/default-image.jpg";
import AuthService from "../../services/auth.service";
import UserDataService from "../../services/UserService";
import http from "../../http-common";
import moment from "moment";

export default function EditAccount() {
  const currentUser = AuthService.getCurrentUser();
  const [user, setUser] = useState({});
  const [file, setFile] = useState();
  const [isImageChange, setIsImageChange] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [message, setMessage] = useState("");
  const inputFileRef = useRef(null);

  let navigate = useNavigate();

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setIsImageChange(!isImageChange);
  };

  const handleInputChange = (event) => {
    setIsChange(!isChange);
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, user)
      .then((response) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const submit = (event) => {

    event.preventDefault();

    let formData = new FormData();
    formData.append("file", file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      http
        .post("/post/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          user.userImage = response.data.key;
          user.updatedAt = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          user.id = currentUser.id;
          updateUser();
          navigate("/account");
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };
  return (
    <Fragment>
      <div className="container bg-white py-3">
        <header className="text-center py-2">
          <h1>Edit Account</h1>
        </header>
        <main className="mx-auto pt-3" style={{ width: "60%" }}>
          <form className="form" onSubmit={submit}>
            <div className="row py-2">
              <div className="col-sm-4 d-flex align-items-center">
                <input
                  filename={file}
                  onChange={fileSelected}
                  ref={inputFileRef}
                  type="file"
                  id="file"
                  accept="images/*"
                ></input>
                <label for="file" className="p-2" style={{ fontSize: "20px" }}>
                  Choose profile picture
                </label>
              </div>
              <div className="col-sm-8 d-flex justify-content-center">
                {user.userImage ? (
                  <img
                    className="img-thumbnail rounded"
                    alt="user account"
                    src={
                      "https://snp-project.s3.amazonaws.com/" + user.userImage
                    }
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
                  id="firstName"
                  className="form-label"
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
                  onChange={handleInputChange}
                  name="firstName"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-sm-4">
                <label
                  id="lastName"
                  className="form-label"
                  style={{ fontSize: "3vmin" }}
                >
                  Last Name
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  className="form-control"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  name="lastName"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-sm-4">
                <label
                  id="oldPassword"
                  className="form-label"
                  style={{ fontSize: "3vmin" }}
                >
                  Old Password
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="oldPassword"
                  className="form-control"
                  placeholder="Old Password"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-sm-4">
                <label
                  id="newPassword"
                  className="form-label"
                  style={{ fontSize: "3vmin" }}
                >
                  New Password
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="New Password"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-sm-4">
                <label
                  id="newPassword2"
                  className="form-label"
                  style={{ fontSize: "3vmin" }}
                >
                  Confirm Password
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="password"
                  id="newPassword2"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-sm-4">
                <label
                  id="email"
                  className="form-label"
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
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end py-2 pt-4">
              <button
                className="btn btn-primary mx-2 fw-bold"
                type="submit"
                style={{ fontSize: "20px", width: "100px" }}
                onClick={submit}
              >
                Save
              </button>
              <button
                type="submit"
                className="btn btn-secondary mx-2 fw-bold"
                style={{ fontSize: "20px" }}
                onClick={() => navigate("/account")}
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </Fragment>
  );
}
