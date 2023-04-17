import React, { useState } from "react";

interface Props {
  post: any;
}

const Post: React.FC<Props> = ({ post }) => {
  const [showJSON, setShowJSON] = useState(false);

  const handleOnClick = () => {
    setShowJSON(!showJSON);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <button onClick={handleOnClick}>View JSON</button>
      {showJSON && <pre>{JSON.stringify(post, null, 2)}</pre>}
    </div>
  );
};

export default Post;
