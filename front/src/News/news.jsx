import React from "react";
import "./News.scss";
import { newsItems } from "./data/items";
const News = () => {
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
        {newsItems.map((item, index) => (
          <div key={index} className="news-card">
            <img src={item.image} alt={item.title} className="news-image" />
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-date">{item.date}</p>
              <p className="news-description">{item.content}</p>
                <a className="news-viewmore" href={item.link}>View More</a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default News;
