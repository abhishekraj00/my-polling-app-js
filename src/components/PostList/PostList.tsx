import React, { useContext } from "react";
import "./PostList.css";
import { PostContext } from "../../App";
import { useNavigate } from "react-router-dom";

export interface Post {
  objectID: string;
  title: string;
  url: string;
  created_at: string;
  author: string;
}

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const { setPost } = useContext(PostContext);
  const naviagte = useNavigate();

  const handleClick = (post: Post) => {
    setPost(post);
    naviagte("/post");
  };

  return (
    <table className="post-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Created At</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr
            key={post.objectID + Math.random() * 100}
            onClick={() => handleClick(post)}
          >
            <td>{post.title}</td>
            <td>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
              </a>
            </td>
            <td>{new Date(post.created_at).toLocaleString()}</td>
            <td>{post.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
