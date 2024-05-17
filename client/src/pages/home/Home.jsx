import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethod";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await publicRequest.get(`post/get/${search}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
