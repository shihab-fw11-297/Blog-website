import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useLocation } from "react-router";
import top from './image/up-arrow-svgrepo-com.svg';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const { search } = useLocation();


  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts" + search);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);


  const gototop = () => {
    window.scrollTo(20, 100)
  }

  const serchItem = (e) => {
    setQuery(e.target.value.toLowerCase())
    if (query.length !== 1) {
      let data = posts.filter((coin) => coin.title.toLowerCase().includes(query) ||
      coin.categories[0].toLowerCase().includes(query)
      ) 
      setPosts(data);
    } else {
      fetchPosts();
    }
  }

  return (
    <>
      <Header />

      <div className="search-bar">
        <i className="topSearchIcon fas fa-search"></i>
        <input
          className="search"
          placeholder="Enter your serach keyword here..."
          onChange={(e) => serchItem(e)}
        />
      </div>
      <div className="home">
        <Posts posts={posts} key={posts._id} />
        <Sidebar />

        <img src={top} alt="top" className="arrow" onClick={gototop} />

      </div>
    </>
  );
}