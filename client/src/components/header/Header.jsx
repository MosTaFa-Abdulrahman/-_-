import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>

      <img
        src="https://thumbs.dreamstime.com/b/young-plant-growing-sunlight-89517487.jpg"
        alt=""
        className="headerImage"
      />
    </div>
  );
}

export default Header;
