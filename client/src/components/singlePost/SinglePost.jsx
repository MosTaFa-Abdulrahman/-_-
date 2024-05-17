import "./singlePost.css";

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../redux/postSlice";

function SinglePost() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get(`post/get/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getPost();
  }, [path]);

  // Delete
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm(
        `Are You Sure Delete This ${post.title} ?`
      );
      if (!confirmed) return;

      await publicRequest.delete(`post/delete/${post._id}`, {
        data: { username: currentUser.username },
      });
      dispatch(deletePost(post._id));
      window.location.replace("/");
      toast.success("Deleted Success 😍");
    } catch (err) {
      console.log(err.message);
      toast.success(err.message);
    }
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await publicRequest.put(`post/update/${post._id}`, {
        username: currentUser.username,
        title,
        desc,
      });
      dispatch(updatePost({ _id: post._id, title, desc }));
      setUpdateMode(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="singlePost">
      <div className="Wrraper">
        <img src={post.photo} alt="" className="spImage" />

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="spTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <>
            <h1 className="spTitle">{title}</h1>
            {post.username === currentUser.username && (
              <div className="spIcons">
                <i
                  className="spEdit fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="spDelete fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </>
        )}

        <div className="spInfo">
          <span className="spAuthor">
            Author:{" "}
            <NavLink to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </NavLink>
          </span>
          <span className="spDate">{format(post.createdAt)}</span>
        </div>

        {updateMode ? (
          <textarea
            value={desc}
            className="spDescInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="spDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="spButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
