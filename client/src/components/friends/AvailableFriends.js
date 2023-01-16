import JSONDATA from './MOCK_DATA.json'
import "../../App.css";
import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar';
import "../SearchBar.css";
import FriendDataService from "../../services/FriendService";
import AuthService from "../../services/auth.service";
import http from "../../http-common";
import { Link } from "react-router-dom";

export default function AvailableFriends() {

  const [friends, setFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState(undefined);
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
    FriendDataService.getAllUserNotFriend(id)
      .then((response) => {
        setFriends(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // const {searchTerm, setSearchTerm} = useState('')
  // const [availableFriends, setAvailableFriends] = useState([]);


//   const getAvailableFriends = () => {
//     Axios.get(`http://localhost:3001/availableFriends`, {
//         headers: {
//             "x-access-token": localStorage.getItem("token"),
//         },
//     }).then((response) => {
//         console.log("getAvailableFriends")
//         setAvailableFriends(response.data)
//     })
//     }

// const makeRequest = (userIdReceiver) => {
//     Axios.post(
//         `http://localhost:3001/makeRequest/${userIdReceiver}`, "data" , {
//           headers: {
//             "x-access-token": localStorage.getItem("token"),
//           },
//         }
//       ).then((response) => {
//         console.log("makeRequest")
//         getAvailableFriends()
//       })
//     }
//     const cancelRequest = (userIdReceiver) => {
//         Axios.delete(`http://localhost:3001/cancelRequest/${userIdReceiver}`, {
//             headers: {
//                 "x-access-token": localStorage.getItem("token"),
//             },
//         }).then((response) => {
//             console.log("cancelRequest")
//             getAvailableFriends();
//         })
//     }

//     const confirmFriend = (userIdSender) => {
//         Axios.put(`http://localhost:3001/acceptRequest/${userIdSender}`,  "data" , {
//             headers: {
//                 "x-access-token": localStorage.getItem("token"),
//             },
//         }).then((response) => {
//             console.log("confirmFriend")
//             getAvailableFriends();
//         })
//     }

//     const declineRequest = (userIdSender) => {
//         Axios.delete(`http://localhost:3001/declineRequest/${userIdSender}`, {
//             headers: {
//                 "x-access-token": localStorage.getItem("token"),
//             },
//         }).then((response) => {
//             console.log("cancelRequest")
//             getAvailableFriends();
//         })
//     }

  return (
    <Fragment>
    <div className="container my-5">
      <h1 className="text-center my-4">Add new Friends</h1>
      <Link to='/friendsList' className='btn btn-warning'>Your Friends</Link>
      <Link to='/closeFriendsList' className='btn btn-success'>Your Close Friends</Link>
      <SearchBar className="searchBar" placeholder="Enter a name..." data={friends} />
      {/* <input
      className="inputSearch" 
      type="text" 
      placeholder="Search..." 
      onChange={(event) => {
        setSearchTerm(event.target.value);
        }}
      /> */}
        {/* {JSONDATA.map((val, key) => {
          return (
          <div className="friends" key = {key}>
            <p> {val.firstName} {val.lastName}</p>
          </div>
          );
        })}
       {JSONDATA.filter((val)=> {
        if (searchTerm == "") 
        {
          return val
        } 
        else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) 
        {
          return val
        }
      }).map((val, key) => {
        return (
        <div className="friends" key = {key}>
          <p> {val.firstName} {val.lastName}</p>
        </div>
        );
      })}  */}
    </div>
    </Fragment>
  );
}
