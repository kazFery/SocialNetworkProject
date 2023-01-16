import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

const AddPost = () => {
  const [file, setFile] = useState();
  const [textArea, setTextArea] = useState("");
  const [isChange, setIsChange] = useState(false);
  const currentUser = AuthService.getCurrentUser();
   let navigate = useNavigate();

  const initialPostState = {
    authorId: "",
    postText: "",
    postImage: "",
    privacy: "P",
    totalLike: 0,
    createdAt: "",
    updatedAt: "",
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");
  const inputFileRef = useRef(null);

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleInputChange = (event) => {
    setIsChange(!isChange);
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

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
          currentPost.postImage = response.data.key;
          currentPost.postText = textArea;
          currentPost.createdAt = new Date()
            .toISOString(response.data.fileKey)
            .slice(0, 19)
            .replace("T", " ");
          currentPost.updatedAt = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          currentPost.authorId = currentUser.id;
          PostDataService.create(currentPost);
          navigate("/");
        });
    } else {
      setMessage("File must be a image(jpeg or png)");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={submit}>
          <fieldset>
            <div className="form-group mt-3 m-auto" style={{ width: "80%" }}>
              <legend className="mt-3 text" style={{ fontSize: "40px" }}>
                Add Post
              </legend>
              <textarea
                onChange={(e) => setTextArea(e.target.value)}
                cols={20}
                rows={10}
                className="form-control"
                value={textArea}
              ></textarea>
              <div
                className="form-group mt-2"
                style={{ width: "15%", border: "none" }}
              >
                <select className="form-select" id="postPrivacy">
                  <option value="P">Public</option>
                  <option value="F">Friends</option>
                  <option value="CF">Close Friends</option>
                </select>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <input
                  filename={file}
                  onChange={fileSelected}
                  ref={inputFileRef}
                  type="file"
                  id="file"
                  accept="images/*"
                ></input>
                <label for="file">Add Image</label>

                <button
                  className="btn btn-primary rounded-4 fw-bold"
                  type="submit"
                  style={{ width: "5rem" }}
                >
                  Post
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </Fragment>
  );
};

export default AddPost;
