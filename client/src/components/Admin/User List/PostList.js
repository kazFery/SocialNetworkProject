import React, { Fragment, useState, useEffect } from "react";
import AdminDataService from "../../../services/AdminService";
import moment from "moment";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    AdminDataService.getAllPosts()
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const refreshList = () => {
  //   retrieveUsers();
  //   setCurrentUser(null);
  //   setCurrentIndex(-1);
  // };

  const setActivePost = (user, index) => {
    setCurrentPost(user);
    setCurrentIndex(index);
  };

  return (
    <Fragment>
      <div className="container py-2">
        <div className="list row">
          <div className="col-md-6">
            <h1 className="my-2">Post list</h1>

            <table className="table-hover table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">Post ID</th>
                  <th scope="col">Author's Name</th>
                  <th scope="col"> Updated Date</th>
                  {/* <th scope="col">Handle</th> */}
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((post, index) => (
                    <tr
                      className={index === currentIndex ? "active" : ""}
                      onClick={() => setActivePost(post, index)}
                      key={index}
                    >
                      <td> {post.id} </td>
                      <td> {post.firstName + "  " + post.lastName}</td>
                      <td> {moment(post.updatedAt).format("MMM Do YY")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            {currentPost ? (
              <div className="container py-2 mt-5">
                <h4>Post</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentPost.postText}
                </div>
                <div>
                  <label>
                    <strong>Image:</strong>
                  </label>{" "}
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
                </div>
                {/* <div>
                  <label>
                    <strong>Role:</strong>
                  </label>{" "}
                  {currentUser.role}
                </div> */}

                <Link
                  to={"/deletePost/" + currentPost.id}
                  className="badge badge-warning"
                >
                  Delete
                </Link>

                <Link
                  to={"/editPost/" + currentPost.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div className="container py-2 mt-5">
                <br />
                <p>Click on a Post</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostList;
