import { Link } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserDataService from "../../services/UserService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";

const Invite = () => {

  const currentUser = AuthService.getCurrentUser();
  let { id } = useParams();
  let navigate = useNavigate();

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

  return (
    <Fragment>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h1>Invite a Person to be your Friend</h1>
              <Link to='/friendsList' className='btn btn-warning'>Your Friends</Link>
              <Link to='/closeFriendsList' className='btn btn-success'>Your Close Friends</Link>
              <Link to="/availableFriends" className="btn btn-primary">Add Friends</Link>
              {/* 
              <Link to="/friends" className="btn btn-warning">
                Friends
              </Link> */}
            </div>
            <div className="col-md-6">
              <h4>Do you want to invite this person?</h4>
                    <div className="card-body">
                      <img
                        style={styles}
                        src={"https://snp-project.s3.amazonaws.com/" + currentFriend.userImage}
                        alt="user image"
                      ></img>
                      <h4>{currentFriend.firstName} {currentFriend.lastName} </h4>
                      <div className="w-50 h-auto">
                            <Link  to={"/requestFriend/" + currentFriend.id} className="btn btn-success my-3"> 
                                  Request
                            </Link>
                            <Link to={"/blockPerson/" + currentFriend.id} className="btn btn-danger">
                                  Block
                            </Link> 
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Invite;