import "./sidebar.css";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethod";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await publicRequest.get("category/get/all");
        setCats(res.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://media.licdn.com/dms/image/D4D03AQGJSF7IfkhPRg/profile-displayphoto-shrink_400_400/0/1705750993618?e=1721260800&v=beta&t=2jH3leY7sk3NLE6F1s-TiPtzqmAcZ962GIePbQtNRQM"
          alt=""
          className="sidebarImage"
        />
        <p className="sidebarInfoText">
          I am a Fresh Graduate From Faculty of Computers and Information and I
          am Full Stack Web Developer Using (React.JS,Node.JS), I am seeking to
          learn more to get an experience, I increase my knowledge stack to
          build stable and high scalable system with strong information
          technology professional.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <NavLink to={`/?cat=${c.name}`} key={c._id} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW</span>
        <div className="sidebarSocial">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-facebook"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-pinterest"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
