import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navLeft">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-facebook"></i>
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-twitter"></i>
        </a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-pinterest"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <i className="navIcon fa-brands fa-square-instagram"></i>
        </a>
      </div>

      <div className="navCenter">
        <ul className="navList">
          <NavLink to="/" className="link">
            <li className="navListItem">Home</li>
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/write" className="link">
                <li className="navListItem">Write</li>
              </NavLink>
              <li
                className="navListItem"
                style={{ color: "red" }}
                onClick={handleLogout}
              >
                LOGOUT
              </li>
            </>
          ) : (
            <NavLink to="/login" className="link">
              <li className="navListItem" style={{ color: "blue" }}>
                LOGIN
              </li>
            </NavLink>
          )}
        </ul>
      </div>

      <div className="navRigth">
        {currentUser ? (
          <NavLink to={`/settings/${currentUser._id}`} className="link">
            <img
              src={
                currentUser?.profilePicture
                  ? currentUser?.profilePicture
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt=""
              className="navImage"
            />
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
