import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

const EditPost = () => {
  const [file, setFile] = useState();
  const [isChange, setIsChange] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  let { id } = useParams();
  let navigate = useNavigate();

  const initialPostState = {
    id: 0,
    authorId: "",
    postText: "",
    postImage: "",
    privacy: "",
    totalLike: 0,
    createdAt: "",
    updatedAt: "",
  };

  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setIsImageChange(!isImageChange);
  };

  useEffect(() => {
    console.log(id);
    PostDataService.get(id)
      .then((res) => {
        console.log(id);
        console.log(res.data);
        setCurrentPost(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setIsChange(!isChange);
    console.log(isChange);
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updatePost = () => {
    // if (
    //   currentPost.authorId === currentUser.id ||
    //   currentUser.role == "ROLE_ADMIN"
    // ) {
    PostDataService.update(currentPost.id, currentPost)
      .then((response) => {
        console.log(response.data);
        setMessage("The post was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    // }
    if (currentUser.role == "user") navigate("/");
    else navigate("/admin/posts");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isImageChange) {
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
            currentPost.postImage = response.data.key;
          });
      } else {
        setMessage("File must be a image(jpeg or png)");
      }
    }
    updatePost();
    navigate("/profile");
  };

  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={submit}>
          <fieldset>
            <div className="form-group mt-3 m-auto" style={{ width: "80%" }}>
              <legend className="mt-3 text" style={{ fontSize: "40px" }}>
                Edit Post
              </legend>
              {/* <div className="form-group mt-3"> */}
              <textarea
                cols={15}
                rows={5}
                className="form-control"
                value={currentPost.postText}
                onChange={handleInputChange}
                name="postText"
              ></textarea>
              {/* </div> */}
              <div
                className="form-group mt-2"
                style={{ width: "15%", border: "none" }}
              >
                <select
                  className="form-select"
                  value={currentPost.privacy}
                  onChange={handleInputChange}
                  id="postPrivacy"
                  name="privacy"
                >
                  <option value="P" selected>
                    Public
                  </option>
                  <option value="F">Friends</option>
                  <option value="CF">Close Friends</option>
                </select>
              </div>
              <div className="w-50 h-25">
                <img
                  className="img-thumbnail rounded"
                  alt="Post"
                  src={
                    "https://snp-project.s3.amazonaws.com/" +
                    currentPost.postImage
                  }
                  width="25%"
                  height="25%"
                />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <input
                  filename={file}
                  defaultValue={currentPost.postImage}
                  onChange={fileSelected}
                  type="file"
                  id="file"
                  accept="images/*"
                />
                {/* </div> */}
                <label for="file">Update Image</label>
                <button
                  className="btn btn-primary rounded-4 fw-bold"
                  type="submit"
                  style={{ width: "5rem" }}
                  onClick={submit}
                >
                  Post
                </button>
                <button
                  className="btn rounded-4 btn-secondary fw-bold"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </Fragment>
  );
};
export default EditPost;
