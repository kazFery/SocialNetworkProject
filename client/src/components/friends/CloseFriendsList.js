import { Link } from "react-router-dom";
import DataFetching from './DataFetching'
import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendDataService from "../../services/FriendService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

export default function CloseFriendsList() {
  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState(undefined);
  const styles = {
    width: 100,
  };
  let id = "";
  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    retrieveFriends(user.id);
    if (user) {
      setCurrentUser(user);
    }
  }, [navigate]);

  const setActiveFriend = (friend, index) => {
    setCurrentFriend(friend);
    setCurrentIndex(index);
  };

  const retrieveFriends = (id) => {
    FriendDataService.getAllUserCloseFriend(id)
      .then((response) => {
        setFriends(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h1>Friends</h1>
              <Link to="/friendsList" className="btn btn-warning">
                Your Friends
              </Link>
              <Link to="/availableFriends" className="btn btn-primary">
                Add Friends
              </Link>
              {/* 
              <Link to="/friends" className="btn btn-warning">
                Friends
              </Link> */}
            </div>
            <div className="col-md-6">
              <h4>Close Friends List</h4>

              <ul className="list-group">
                {friends &&
                  friends.map((friend, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveFriend(friend, index)}
                      key={index}
                    >
                    <div className="card-body">
                      <img
                        style={styles}
                        src={"https://snp-project.s3.amazonaws.com/" + friend.user.userImage}
                        alt="user image"
                      ></img>
                      <h4>{friend.user.firstName} {friend.user.lastName} </h4>
                       <h5 className="">Status: {friend.status}</h5>
                       <h5 className="">IsClose: {(friend.isClose === true  ? 'yes' : 'no')}</h5>
                      <div className="w-50 h-auto">
                        {/* <img
                          className="img-thumbnail rounded"
                          alt="Post"
                          src={
                            "https://snp-project.s3.amazonaws.com/" +
                            friend.Image
                          }
                        /> */}
                        <div>
                          {index === currentIndex && (
                          <div>
                            {(currentFriend.status === "accept" ? 
                            <div>
                            <Link  to={"/unFriend/" + currentFriend.userIdReceiver} className="btn btn-success my-3">
                                  Unfriend
                            </Link>
                            <Link to={"/blockFriend/" + currentFriend.userIdReceiver} className="btn btn-danger">
                                  Block
                            </Link>
                            {(currentFriend.isClose === false ?                             
                            <Link to={"/closeFriend/" + currentFriend.userIdReceiver} className="btn btn-primary">
                                  Make Close
                            </Link> :
                            <Link to={"/unCloseFriend/" + currentFriend.userIdReceiver} className="btn btn-primary">
                                  Remove Close
                            </Link>
                            )}
                            </div>
                            : 
                              (currentFriend.status === "pending" ? 
                              <div>
                                <Link to={"/unInvite/" + currentFriend.userIdReceiver} className="btn btn-warning my-3">
                                Decline
                                </Link>
                                <Link to={"/blockFriend/" + currentFriend.userIdReceiver} className="btn btn-danger">
                                Block
                                </Link>
                              </div>
                                :
                                (currentFriend.status === "block" ? 
                                <div>
                                <Link to={"/unBlock/" + currentFriend.userIdReceiver} className="btn btn-success">
                                UnBlock
                                </Link>
                                </div>
                                : <a></a>
                                )))}
                            </div>
                            )}
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