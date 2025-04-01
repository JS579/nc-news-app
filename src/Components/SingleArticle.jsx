import {useParams, Link} from "react-router"
import {useState, useEffect} from "react"
import { getArticleById, getCommentsbyArticleId, modifyArticleById } from "../API";
import Comment from "./Comment";



function SingleArticle(){

const [isLoading, setIsLoading] = useState(true);
const [commentsLoading, setCommentsLoading] = useState(true)
const [commentLink, setCommentLink] = useState(true)
const [viewComments, setViewComments] = useState(false)
const [article, setArticle] = useState()
const [comments, setComments] = useState([])
const [optimisticVotes, setOptimisticVotes] = useState(0)
const [voteError, setVoteError] = useState(false)
const {article_id} = useParams()

function increaseVotes(){
    modifyArticleById(article_id, 1).catch(()=>{
        setVoteError(true)
        setOptimisticVotes((currentOptimisticVotes) =>{
            return currentOptimisticVotes -1
        })
    })
    setVoteError(false)
    setOptimisticVotes(optimisticVotes +1)
}

function decreaseVotes(){
    modifyArticleById(article_id, -1).catch(()=>{
        setVoteError(true)
        setOptimisticVotes((currentOptimisticVotes) =>{
            return currentOptimisticVotes +1
        })
    })
    setVoteError(false)
    setOptimisticVotes(optimisticVotes -1)
}

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
            <span><b>Votes: </b>{article.votes + optimisticVotes}</span><br/>
            <button className="vote-button" onClick={(increaseVotes)}>Up Vote</button>&nbsp;&nbsp;&nbsp;
            <button className="vote-button" onClick={(decreaseVotes)}>Down Vote</button><br />
            {!voteError ? <p></p> : <p className="error-msg">Something wen't wrong, please try again!</p>}
            <br /><br/>

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