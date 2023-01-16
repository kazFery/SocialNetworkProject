import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostDataService from "../../services/PostService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

const DeletePost = () => {
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
  }, []);

  const getPrivacy = (p) => {
    switch (p) {
      case "P":
        return "Public";
      case "F":
        return "Freind";
      case "CF":
        return "Close Freind";
      default:
        return "";
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    PostDataService.remove(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    if (currentUser.role == "user") navigate("/");
    else navigate("/admin/posts");
  };

  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={submit}>
          <div className="form-group mt-3 m-auto" style={{ width: "60%" }}>
            <legend className="mt-3 text" style={{ fontSize: "40px" }}>
              Delete Post
            </legend>
            {/* <div className="form-group mt-3"> */}
            <textarea
              cols={15}
              rows={5}
              className="form-control"
              value={currentPost.postText}
              name="postText"
              disabled
            ></textarea>
            <div
              className="form-group mt-2"
              style={{ width: "15%", border: "none" }}
            >
              <lable className="form-group" id="postPrivacy">
                Privacy:
              </lable>
              <span>{getPrivacy(currentPost.privacy)}</span>
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
              <div>
                <button
                  className="btn btn-primary rounded-4 fw-bold"
                  type="submit"
                  style={{ width: "5rem" }}
                  onClick={submit}
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="btn rounded-4 btn-secondary fw-bold"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default DeletePost;
