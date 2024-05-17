import "./register.css";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      if (username && email && password) {
        const res = await publicRequest.post("/auth/register", {
          username,
          email,
          password,
        });
        dispatch(setCredentials(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success("Register Success 😍");
      }
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="registerButton" type="submit">
          Register
        </button>
        {error && <span className="error">Something Wrong ~!!</span>}
      </form>

      <NavLink to="/login" className="link">
        <button className="registerLoginButton">Login</button>
      </NavLink>
    </div>
  );
}

export default Register;
