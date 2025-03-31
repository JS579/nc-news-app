import { useState, useEffect } from "react"
import { getArticles, getArticlesByTopic } from "../API"
import ArticleCard from "./ArticleCard";
import { useSearchParams, Link } from "react-router";

function Articles(){
const [articles, setArticles] = useState([]);
const [searchParams, setSearchParams] = useSearchParams()
const [isLoading, setIsLoading] = useState(true);


const topic = searchParams.get("topic")

useEffect(() => {   
    if(!topic){
    getArticles().then((articles) => {
    setArticles(articles);
        setIsLoading(false);
  })
} else {
    getArticlesByTopic(topic).then((articles) => {
        setArticles(articles);
        setIsLoading(false);
    })}
}, [topic]);

if (isLoading) {
    return <p>Loading...</p>;
  }

    return (
        <>
        <h2 className="welcome-msg">{topic ? `${topic[0].toUpperCase()}${topic.slice(1)}` : "All Articles"}</h2>
        <ul className="articles-list">
          {articles.map((article) => {
            return (
                <ArticleCard article ={article} key={article.article_id}/>
            );
          })}
        </ul>
        </>
    )
}

export default Articles