import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Comments from "./pages/Comments";

import AddPost from "./components/post/AddPost";
import EditPost from "./components/post/EditPost";
import DeletePost from "./components/post/DeletePost";

import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import FriendsList from "./components/friends/FriendsList";
import AvailableFriends from "./components/friends/AvailableFriends";
import Friends from "./components/friends/Friends";
import RequestFriend from "./components/friends/RequestFriend";
import UnFriend from "./components/friends/UnFriend";
import CloseFriendsList from "./components/friends/CloseFriendsList";
import BlockPerson from "./components/friends/BlockPerson";
import UnBlock from "./components/friends/UnBlock";
import BlockFriend from "./components/friends/BlockFriend";
import CloseFriend from "./components/friends/CloseFriend";
import UnCloseFriend from "./components/friends/UnCloseFriend";
import Invite from "./components/friends/Invite";
import Accept from "./components/friends/Accept";

import Account from "./components/Account/Account";
import EditAccount from "./components/Account/EditAccount";
import Profile from "./components/Profile";
import AddComment from "./components/Comments/AddComment";

import AdminIndex from "./components/Admin/Index";
import AdminUserList from "./components/Admin/UserList";
import AdminStatistics from "./components/Admin/Statistics";
import AddUser from "./components/Admin/User List/AddUser";
import EditUser from "./components/Admin/User List/EditUser";
import DeleteUser from "./components/Admin/User List/DeleteUser";
import UserPosts from "./components/Admin/User List/PostList";
import EditUserPost from "./components/Admin/User List/UserPost/EditUserPost";
import DeleteUserPost from "./components/Admin/User List/UserPost/DeleteUserPost";
import AuthService from "./services/auth.service";
import UserList from "./components/Admin/User List/UserList";
import PostList from "./components/Admin/User List/PostList";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    setIsLoggedIn(false);
    setIsAdmin(false);

    if (user) {
      setIsLoggedIn(true);

      if (user.roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    }
  }, [location]);

  if (isAdmin) {
    return (
      <div className="wrapper">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="*" element={<Navigate replace to="/admin" />} />
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/statistics" element={<AdminStatistics />} />
            <Route path="/admin/adduser" element={<AddUser />} />
            <Route path="/admin/edituser" element={<EditUser />} />
            <Route path="/admin/deleteuser" element={<DeleteUser />} />
            <Route path="/admin/posts" element={<PostList />} />
            <Route path="/editPost/:id" element={<EditPost />} />
            <Route path="/deletePost/:id" element={<DeletePost />} />
            <Route
              path="/admin/userlist/userposts/edit"
              element={<EditUserPost />}
            />
            <Route
              path="/admin/userlist/userposts/delete"
              element={<DeleteUserPost />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="wrapper">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="*" element={<Navigate replace to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/editPost/:id" element={<EditPost />} />
            <Route path="/deletePost/:id" element={<DeletePost />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friendsList" element={<FriendsList />} />
            <Route path="/availableFriends" element={<AvailableFriends />} />
            <Route path="/closeFriendsList" element={<CloseFriendsList />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/edit" element={<EditAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unFriend" element={<UnFriend />} />
            <Route path="/blockPerson/:id" element={<BlockPerson />} />
            <Route path="/unBlock/:id" element={<UnBlock />} />
            <Route path="/blockFriend/:id" element={<BlockFriend />} />
            <Route path="/closeFriend/:id" element={<CloseFriend />} />
            <Route path="/unCloseFriend/:id" element={<UnCloseFriend />} />
            <Route path="/requestFriend/:id" element={<RequestFriend />} />
            <Route path="/unFriend/:id" element={<UnFriend />} />
            <Route path="/invite/:id" element={<Invite />} />
            <Route path="/accept/:id" element={<Accept />} />
            <Route path="/addComment/:id" element={<AddComment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Navbar />
      <div className="mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
