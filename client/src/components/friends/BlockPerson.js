import { Link } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserDataService from "../../services/UserService";
import FriendDataService from "../../services/FriendService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

const BlockPerson = () => {

  const currentUser = AuthService.getCurrentUser();
  let { id } = useParams();
  let navigate = useNavigate();
  let data = 'block'
  const initialFriendState = {
    id: 0,
    email: "",
    role: "",
    firstName: "",
    lastName: "",
    userImage: "",
    birthDate: "",
  };

  const [currentFriend, setCurrentFriend] = useState(initialFriendState);

  const styles = {
    width: 200,
  };

  useEffect(() => {
    console.log(id);
    UserDataService.getUserInfo (id)
      .then((res) => {
        console.log(id);
        console.log(res.data);
        setCurrentFriend(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);


  const block = async (event) => {
    event.preventDefault();
    FriendDataService.updateBlockPerson(currentUser.id, id)
    .then(FriendDataService.updateBlockedPerson(id, currentUser.id))
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/friendsList");
  };


  return (
    <Fragment>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h1>Block a Person</h1>
              <Link to='/friendsList' className='btn btn-warning'>Your Friends</Link>
              <Link to='/closeFriendsList' className='btn btn-success'>Your Close Friends</Link>
              <Link to="/availableFriends" className="btn btn-primary">
                Add Friends
              </Link>
              {/* 
              <Link to="/friends" className="btn btn-warning">
                Friends
              </Link> */}
            </div>
            <div className="col-md-6">
              <h4>Do you want to Block this person?</h4>
                    <div className="card-body">
                      <img
                        style={styles}
                        src={"https://snp-project.s3.amazonaws.com/" + currentFriend.userImage}
                        alt="user image"
                      ></img>
                      <h4>{currentFriend.firstName} {currentFriend.lastName} </h4>
                      <div className="w-50 h-auto">
                      <button
                        className="btn btn-danger rounded-4 fw-bold"
                        type="submit"
                        style={{ width: "5rem" }}
                        onClick={block}
                      >
                        Block
                      </button>
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BlockPerson;