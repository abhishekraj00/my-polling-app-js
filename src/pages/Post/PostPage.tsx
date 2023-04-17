import React, { useContext } from "react";
import { PostContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./PostPage.css";

const PostPage = () => {
  const { post } = useContext(PostContext);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="post-page">
      <div className="heading">Post Json Data</div>
      {post && (
        <div>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      )}
      <button onClick={handleBack}>Return To Home</button>
    </div>
  );
};

export default PostPage;
