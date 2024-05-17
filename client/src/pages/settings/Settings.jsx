import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/userSlice";
import { useParams } from "react-router-dom";
import upload from "../../upload";

function Settings() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  // Get user
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await publicRequest.get(`/user/get/${id}`);
        if (!data) {
          return console.log("User Not Found 😥");
        } else setUser(data);
      } catch (error) {
        console.log(`${error.message} 😥`);
      }
    };
    getUserProfile();
  }, [id]);

  // Update User
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
  }, [user?.email, user?.username]);

  // Update User
  const hadnleUpdate = async (e) => {
    e.preventDefault();

    try {
      let profileUrl;
      profileUrl = file ? await upload(file) : user?.profilePicture;

      const userData = {
        username,
        email,
        profilePicture: profileUrl,
      };
      await publicRequest.put(`/user/update/${id}`, userData);
      dispatch(updateUser({ _id: id, username, email, profileUrl }));
      toast.success(`${user?.username} Updated Success`);
    } catch (error) {
      toast.error(`${error.message} 😥`);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span className="update">Update Account</span>
        </div>

        <form className="sForm" onSubmit={hadnleUpdate}>
          <label>Profile Picture</label>
          <div className="sPP">
            {file && (
              <img src={URL.createObjectURL(file)} alt="" className="sImage" />
            )}

            <label htmlFor="fileInput">
              <i className="userIcon fa-solid fa-user-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="sSubmit" type="submit">
            Update
          </button>
        </form>
      </div>

      <Sidebar />
    </div>
  );
}

export default Settings;
