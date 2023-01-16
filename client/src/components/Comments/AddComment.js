import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import PostDataService from "../../services/PostService";
import CommentDataService from "../../services/CommentService";
import image from "../../images/default-image.jpg";
import axios from "axios";

export default function AddComment() {
    // const [posts, setPosts] = useState([]);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    // const [currentUser, setCurrentUser] = useState(undefined);
    // let navigate = useNavigate();
    // let {id} = useParams();
    // const [comments, setComments] = useState([]);
    // const [newComment, setNewComment] = useState("");

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();
    //     retrievePosts(user.id);
    //     if (user) {
    //         setCurrentUser(user);
    //         //setShowApply(user.roles.includes("ROLE_USER"));
    //     }
    // }, [navigate]);

    // useEffect(() => {
    //     axios.get(`http://localhost:3000//post/${id}`).then((response) => {
    //         setPosts(response.data);
    //     });

    //     axios.get(`http://localhost:3000/comments/api/post/${id}`).then((response) => {
    //         setComments(response.data);
    //     });
    // }, []);

    // const insertComment = () => {
    //     axios.post(`http://localhost:3000/comments/${id}`, {
    //         commentText: newComment, 
    //         postId: id,
    //     }).then((response) => {
    //         const commentToAdd = {commentText: newComment};
    //         setComments([...comments, commentToAdd]);
    //         setNewComment("");
    //     });
    // };

    // const retrievePosts = (id) => {
    //     PostDataService.getAllHomePost(id)
    //         .then((response) => {
    //             setPosts(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };
    
    const [textArea, setTextArea] = useState("");
    const [isChange, setIsChange] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
    let {id} = useParams();

    const initialCommentState = {
        authorId: "",
        commentText: "",
        postId: "",
        createdAt: "",
        updatedAt: "",
    };
    const [currentComment, setCurrentComment] = useState(initialCommentState);
    const [message, setMessage] = useState("");

    const handleInputChange = (event) => {
        setIsChange(!isChange);
        const { name, value } = event.target;
        setCurrentComment({ ...currentComment, [name]: value });
    };

    const submit = (event) => {
        event.preventDefault();
        currentComment.commentText = textArea;
        currentComment.createdAt = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
        currentComment.updatedAt = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

        currentComment.authorId = currentUser.id;
        currentComment.postId = id;
        //CommentDataService.create(currentComment);
        CommentDataService.create(currentComment.postId, currentComment);
        navigate("/profile");
    };

    return (
        <Fragment>
        <div className="container">
            <form className="form" onSubmit={submit}>
            <fieldset>
                <div className="form-group mt-3 m-auto" style={{ width: "80%" }}>
                <legend className="mt-3 text" style={{ fontSize: "40px" }}>
                    Add Comment
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
                </div>
                <div className="mt-3 d-flex justify-content-between">

                    <button
                        className="btn btn-primary rounded-4 fw-bold"
                        type="submit"
                        style={{ width: "8rem" }}
                    >
                    Comment
                    </button>
                </div>
                </div>
            </fieldset>
            </form>
        </div>
        </Fragment>
    );
}