import "./post.css";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";

function Post({ post }) {
  return (
    <div className="post">
      <img
        src={
          post?.photo
            ? post.photo
            : "https://media.istockphoto.com/id/1822381559/photo/social-media-notifications-icon-on-the-podium.webp?b=1&s=170667a&w=0&k=20&c=Re7oQWhPMyJzMeEczGRmNoKW7S2c_TIEYsFNFdwZc4Y="
        }
        alt=""
        className="postImage"
      />

      <div className="postInfo">
        <div className="postCats">
          {post.categories?.map((c, i) => (
            <span className="postCat" key={i}>
              {c.name}
            </span>
          ))}
        </div>
        <span className="postTitle">{post.title}</span>
        <hr />
        <span className="postDate">{format(post.createdAt)}</span>
      </div>

      <NavLink to={`/single/${post._id}`} className="link">
        <p className="postDesc">{post.desc}</p>
      </NavLink>
    </div>
  );
}

export default Post;
