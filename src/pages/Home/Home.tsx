import React, { useState, useEffect, useCallback } from "react";
import { fetchPosts } from "../../services/api";
import PostList from "../../components/PostList/PostList";
import "./Home.css";

// Define the interface for a Post object
interface Post {
  objectID: string;
  title: string;
  url: string;
  created_at: string;
  author: string;
}

const Home: React.FC = () => {
  // Define state variables
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Function to load more posts
  const loadMorePosts = useCallback((): void => {
    setIsLoading(true);
    setIsFetching(true);
    // Call the fetchPosts function with the current page number
    fetchPosts(page)
      .then((newPosts: Post[]) => {
        // Add the new posts to the existing posts array
        setPosts((prev) => [...prev, ...newPosts]);
        // Increment the page number for the next fetchPosts call
        setPage((prev) => prev + 1);
      })
      .catch((error: Error) => {
        console.error(error);
      })
      .finally(() => {
        setIsFetching(false);
        setIsLoading(false);
      });
  }, [page]);

  // Use the useEffect hook to call loadMorePosts every 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      loadMorePosts();
    }, 10000); // 10 seconds in milliseconds

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [loadMorePosts]);

  // Use the useEffect hook to listen for scroll events and call loadMorePosts when the user has scrolled to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (
        !isFetching && // Check that a fetch request isn't already in progress
        document.documentElement.scrollHeight <=
          window.innerHeight + document.documentElement.scrollTop + 1 // Check that the user has scrolled to the bottom of the page
      ) {
        loadMorePosts();
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, loadMorePosts]);

  if (page === 0) {
    return <div>Fetching Data...</div>;
  }

  // Render the component
  return (
    <div className="home-container">
      <h1 className="home-title">Posts</h1>
      <PostList posts={posts} />
      {isLoading && <p className="home-loading">Loading...</p>}
    </div>
  );
};

export default Home;
