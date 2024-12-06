import {useContext, useEffect, useState} from "react";
import "./News.scss";
// import { newsItems } from "./data/items";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
// import axios from "axios";


const News = () => {
  const { loginStatus } = useContext(UserContext);
  const [newsItems, setNewsItems] = useState([]);
  const getNews = async () => {
    try {
      // const res = await fetch(
      //   `https://newsapi.org/v2/everything?q=astronomy&apiKey=${import.meta.env.VITE_NEWS_KEY}&sortBy=publishedAt&pageSize=20`
      // );
      const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=20");
      const data = await res.json();
      setNewsItems(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(()=>{
    getNews();
  },[]);

  return (
    <div className="solar-system-news">
      <header className="news-header">
        <h1>News</h1>
        <p>
          Explore the latest discoveries and updates about our solar system and
          beyond.
        </p>
      </header>
      <section className="news-list">
        {newsItems && newsItems.slice(0,loginStatus ?newsItems.length-1 :3).map((item, index) => (
          <div key={index} className="news-card">
            <img src={item.image_url} alt={item.title} className="news-image" />
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-date">{item.published_at}</p>
              <p className="news-description">{item.summary}</p>
                <a className="news-viewmore" target="_blank" href={item.url}>View More</a>
            </div>
          </div>
        ))}
      </section>
        {!loginStatus && <Link className="lg" to="/signin">Login to view all news</Link>}
    </div>
  );
};

export default News;
