import {useParams, Link} from "react-router"
import {useState, useEffect} from "react"
import { getArticleById, getCommentsbyArticleId } from "../API";
import Comment from "./Comment";


function SingleArticle(){

const [isLoading, setIsLoading] = useState(true);
const [commentsLoading, setCommentsLoading] = useState(true)
const [commentLink, setCommentLink] = useState(true)
const [viewComments, setViewComments] = useState(false)
const [article, setArticle] = useState()
const [comments, setComments] = useState([])
const {article_id} = useParams()


useEffect(() => {
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false)
    }).then(()=>{
        getCommentsbyArticleId(article_id).then((comments) => {
            setComments(comments)
            setCommentsLoading(false)
        })
    });
  }, [article_id]);

  function showCommentsClick(){
    setViewComments(!viewComments)
    setCommentLink(!commentLink)
  }

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
            {commentLink ? <p onClick={showCommentsClick}><Link to="">{article.comment_count} comments</Link></p> : <p onClick={showCommentsClick}><Link to="">Hide comments</Link></p>}
        <br />

      {!viewComments ? <p></p> :  <ul className="comment-list">
       {commentsLoading ? <p>Loading...</p> : <span>{comments.map((comment)=> {
        return <Comment comment={comment} key={comment.comment_id}/>
       })}</span>}
        </ul>}

        </>
    )
}

export default SingleArticle