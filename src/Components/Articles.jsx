import { useState, useEffect } from "react"
import { getArticles } from "../API"
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null)
  const [order, setOrder] = useState(null)
  const [sortLoading, setSortLoading] = useState(false)


  const topic = searchParams.get("topic")


  function handleSort(event) {
    setSortLoading(true)
    setSortBy(event.target.value)
  }

  function handleOrder(event) {
    setSortLoading(true)
    setOrder(event.target.value)
  }


  useEffect(() => {
    getArticles(topic, sortBy, order).then((articles) => {
      if (articles.length > 0) {
        setArticles(articles);
        setIsLoading(false);
        setSortLoading(false)
      } else {
        setIsLoading(false);
        setIsError(true)
      }
    })
  }, [topic, sortBy, order]);


  if (isLoading) {
    return <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>;
  }

  if (isError) {
    return <><br /><p className="error-msg">The topic you're looking for does not exist</p></>
  }

  return (
    <>
      <h2 className="articles-topics">{topic ? `${topic[0].toUpperCase()}${topic.slice(1)}` : "All Articles"}</h2>

      <form className="sort-buttons">
        <span className="sort"><b>Sort by:</b></span>
        <ul className="radio-buttons">
          <li><label >Date posted</label>&nbsp;&nbsp;<input type="radio" name="sort-by" value="created_at" onChange={handleSort} /></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li><label >Votes</label>&nbsp;&nbsp;<input type="radio" name="sort-by" value="votes" onChange={handleSort} /></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li><label >Comments</label>&nbsp;&nbsp;<input type="radio" name="sort-by" value="comment_count" onChange={handleSort} /></li>
        </ul></form>
      <form>
        <span className="sort"><b>Order:</b></span>
        <ul className="radio-buttons">
          <li><label >Ascending</label>&nbsp;&nbsp;<input type="radio" name="order-by" value="asc" onChange={handleOrder} /></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li><label >Descending</label>&nbsp;&nbsp;<input type="radio" name="order-by" value="desc" onChange={handleOrder} /></li>
        </ul></form>
      {sortLoading ? <div className="spinner-border" role="status"><span className="sr-only"></span></div> : <></>}

      <ul className="articles-list">
        {articles.map((article) => {
          return (
            <ArticleCard article={article} key={article.article_id} />
          );
        })}
      </ul>
    </>
  )
}

export default Articles