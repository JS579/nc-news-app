import {useParams} from "react-router"
import {useState, useEffect} from "react"
import { getArticleById } from "../API";



function SingleArticle(){

const [isLoading, setIsLoading] = useState(true);
const [article, setArticle] = useState()
const currentArticle = useParams()

useEffect(() => {
    getArticleById(currentArticle.article_id).then((article) => {
      setArticle(article);
      setIsLoading(false)
    });
  }, [currentArticle]);

if(isLoading){
    return (
        <p>Loading...</p>
    )
}

    return (<>
        <h2>{article.title}</h2><br />
        <img src={article.article_img_url}/> <br /> <br/><br/>
        <p><b>Author: </b>{article.author}<br/><b>Posted: </b>{(new Date(article.created_at)).toDateString()}</p><br />
        <p className="article-body">{article.body}</p>
<br />
            <p><b>Votes: </b>{article.votes}</p>
            <span>{article.comment_count} comments</span> 
        </>
    )
}

export default SingleArticle