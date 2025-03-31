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
        <p>{article.body}</p>
        </>
    )
}

export default SingleArticle