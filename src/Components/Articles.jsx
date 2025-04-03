import { useState, useEffect } from "react"
import { getArticles } from "../API"
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router";

function Articles(){
const [articles, setArticles] = useState([]);
const [searchParams, setSearchParams] = useSearchParams()
const [isLoading, setIsLoading] = useState(true);


const topic = searchParams.get("topic")

useEffect(() => {   
    getArticles(topic).then((articles) => {
    setArticles(articles);
        setIsLoading(false);
  })
}, [topic]);

if (isLoading) {
    return <div className="spinner-border" role="status">
    <span className="sr-only"></span>
  </div>;
  }

    return (
        <>
        <h2 className="welcome-msg">{topic ? `${topic[0].toUpperCase()}${topic.slice(1)}` : "All Articles"}</h2>
        <ul className="articles-list">
          {articles.map((article) => {
            return (
                <ArticleCard article={article} key={article.article_id}/>
            );
          })}
        </ul>
        </>
    )
}

export default Articles