import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PostPage from "./pages/Post/PostPage";
import { createContext, useState } from "react";
import { Post } from "./components/PostList/PostList";

interface PostContextProp {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostContext = createContext<PostContextProp>(
  {} as PostContextProp
);

function App() {
  const [post, setPost] = useState<Post | null>(null);
  return (
    <PostContext.Provider value={{ post, setPost }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </PostContext.Provider>
  );
}

export default App;
