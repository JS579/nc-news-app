import { useState, useEffect } from "react"
import { getArticles } from "../API"
import ArticleCard from "./ArticleCard";

function Articles(){

const [articles, setArticles] = useState([]);

useEffect(() => {   
    getArticles().then((articles) => {
    setArticles(articles);
  });
}, []);


    return (
        <>
        <h2 className="welcome-msg">All Articles</h2>
        <ul className="articles-list">
          {articles.map((article) => {
            return (
                <ArticleCard article ={article} key={article.title}/>
            );
          })}
        </ul>
        </>
    )
}

export default Articles