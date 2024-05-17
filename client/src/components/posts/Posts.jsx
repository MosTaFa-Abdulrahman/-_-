import "./posts.css";
import Post from "../post/Post";

function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Posts;
