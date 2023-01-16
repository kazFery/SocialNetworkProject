import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import image from "../images/default-image.jpg";
import PostDataService from "./../services/PostService";
import AuthService from "./../services/auth.service";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [userPost, setUserPost] = useState({});
  const [like, setLike] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState(undefined);
  let id = "";
  let navigate = useNavigate();

  const initialPostLike = {
    userId: 1,
    postId: 1,
    status: 0,
    createdAt: "",
    updatedAt: "",
  };

  const [postLike, setPostLike] = useState(initialPostLike);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    retrievePosts(user.id);
    if (user) {
      setCurrentUser(user);
      //setShowApply(user.roles.includes("ROLE_USER"));
    }
  }, [navigate, like]);

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
    id = currentPost.id;
  };

  const retrievePosts = (id) => {
    PostDataService.getAllUserPost(id)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addLike = (postID) => {
    setLike(!like);
    setPostLike({
      userId: currentUser.id,
      postId: postID,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    PostDataService.addLike(postLike)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      " at " +
      strTime
    );
  }

  return (
    <Fragment>
      <div className="container py-2">
        <header className="row py-3">
          <div className="col-sm-8">
            <div className="row">
              <div
                className="col-sm-4 d-flex justify-content-center"
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {/* <img
                  style={{ "border-radius": "70%" }}
                  src={
                    "https://snp-project.s3.amazonaws.com/" +
                    currentUser.userImage
                  }
                  alt="user profile"
                  width="40px"
                  height="40px"
                />{" "} */}
              </div>
              <div
                className="col-sm-8 d-flex align-items-start"
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3 className="fw-bold"> {currentUser.firstName}</h3>
                <p>19 Friends</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 d-flex justify-content-end align-items-end">
            <Link to="/addPost" className="btn btn-primary mx-2">
              Add Post
            </Link>
            <Link to="/account/edit" className="btn btn-info mx-2">
              Edit Profile
            </Link>
          </div>
          <hr className="mt-2" />
        </header>
      </div>
      <div className="wrapper">
        <div className="container py-2">
          <div className="mx-auto" style={{ width: "70%" }}>
            <div>
              <ul className="list-group">
                {posts &&
                  posts.map((post, index) => (
                    <li
                      className={
                        "list-group-item mb-3" +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActivePost(post, index)}
                      key={index}
                    >
                      <img
                        style={{ "border-radius": "70%" }}
                        src={
                          "https://snp-project.s3.amazonaws.com/" +
                          post.user.userImage
                        }
                        alt="user profile"
                        width="40px"
                        height="40px"
                      />{" "}
                      <span className="justify-content-start">
                        {" "}
                        {post.user.firstName}
                      </span>
                      <h3>{userPost.firstName}</h3>
                      <h4 className="pt-2">{post.postText}</h4>
                      <div className="w-100 h-auto text-center">
                        <img
                          className="img-thumbnail rounded"
                          alt="Post"
                          src={
                            "https://snp-project.s3.amazonaws.com/" +
                            post.postImage
                          }
                        />
                        <div>
                          {index === currentIndex && (
                            <div>
                              <Link
                                to={"/editPost/" + currentPost.id}
                                className="btn btn-success my-3"
                              >
                                Edit
                              </Link>

                              <Link
                                to={"/deletePost/" + currentPost.id}
                                className="btn btn-danger"
                              >
                                Delete Post
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="p-4 d-flex justify-content-around">
                          <button
                            type="button"
                            class="btn btn-light"
                            style={{ color: "#000000" }}
                            onClick={() => addLike(post.id)}
                          >
                            <div className="">
                              <span className="justify-content-end">
                                {" "}
                                {post.totalLike}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-hand-thumbs-up-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                              </svg>
                              <span
                                className="ml-1 align-middle"
                                style={{ fontSize: "25px" }}
                              >
                                Like
                              </span>
                            </div>
                          </button>
                          {/* {index === currentIndex && ( */}
                          <Link
                            to={"/addComment/" + post.id}
                            style={{ color: "#000000" }}
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-chat-square-text-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                              </svg>
                              <span
                                className="ml-2 align-middle"
                                style={{ fontSize: "22px" }}
                              >
                                Comment
                              </span>
                            </div>
                          </Link>
                          {/* )} */}
                        </div>
                        <div className="row px-4 py-2">
                          {/* <div className="col-sm-2 px-2 text-center mb-2" >
                            <img src={image} alt="user profile photo" style={{ width: "80px" }} />
                          </div> */}
                          <div className="col-sm-10 mb-2 text-left">
                            {posts &&
                              posts.map((post, index) => (
                                <li
                                  className={
                                    "list-group-item mb-3" +
                                    (index === currentIndex ? "active" : "")
                                  }
                                  onClick={() => setActivePost(post, index)}
                                  key={index}
                                >
                                  <div className="row">
                                    <div className="col-1">
                                      <img
                                        style={{ "border-radius": "70%" }}
                                        src={
                                          "https://snp-project.s3.amazonaws.com/" +
                                          post.user.userImage
                                        }
                                        alt="user profile"
                                        width="40px"
                                        height="40px"
                                      />
                                    </div>
                                    <div className="col">
                                      <h5 className="text-left">
                                        {post.user.firstName}{" "}
                                        {post.user.lastName}
                                      </h5>

                                      <span className="justify-content-start py-10">
                                        {" "}
                                        {formatDate(
                                          new Date(Date.parse(post.createdAt))
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  <h4 className="pt-2">{post.postText}</h4>
                                </li>
                              ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
