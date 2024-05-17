import "./write.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../redux/postSlice";
import { publicRequest } from "../../requestMethod";
import { toast } from "react-toastify";
import upload from "../../upload";

function Write() {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch All Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await publicRequest.get("/category/get/all");
        setCategories(data);
      } catch (error) {
        console.log("Error Fetch Categories");
      }
    };
    fetchCategories();
  }, []);

  // ADD POST
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let photo;
      photo = file
        ? await upload(file)
        : "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D";

      const postData = {
        username: currentUser.username,
        title,
        desc,
        photo,
        categories: selectedCategory,
      };
      const { data } = await publicRequest.post(`/post/create`, postData);
      dispatch(addPost(data));
      window.location.replace("/");
      toast.success(`Created Success ${postData.title}  🥰`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImage" />
      )}

      <form className="writeForm" onSubmit={handleClick}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title.. "
            autoFocus={true}
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="writeInput"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story ☻"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="publish" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Write;
