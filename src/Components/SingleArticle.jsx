import { useParams, Link } from "react-router"
import { useState, useEffect } from "react"
import { getArticleById, getCommentsbyArticleId, modifyArticleById } from "../API";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";


function SingleArticle() {

    const [isLoading, setIsLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [commentLink, setCommentLink] = useState(true)
    const [viewComments, setViewComments] = useState(false)
    const [article, setArticle] = useState()
    const [comments, setComments] = useState([])
    const [optimisticVotes, setOptimisticVotes] = useState(0)
    const [voteError, setVoteError] = useState(false)
    const [viewCommentForm, setViewCommentForm] = useState(false)
    const [commentsUpdated, setCommentsUpdated] = useState(false)
    const [commentInput, setCommentInput] = useState("")
    const { article_id } = useParams()

    const currentUsername = "tickle122"

    function increaseVotes() {
        modifyArticleById(article_id, 1).catch(() => {
            setVoteError(true)
            setOptimisticVotes((currentOptimisticVotes) => {
                return currentOptimisticVotes - 1
            })
        })
        setVoteError(false)
        setOptimisticVotes(optimisticVotes + 1)
    }

    function decreaseVotes() {
        modifyArticleById(article_id, -1).catch(() => {
            setVoteError(true)
            setOptimisticVotes((currentOptimisticVotes) => {
                return currentOptimisticVotes + 1
            })
        })
        setVoteError(false)
        setOptimisticVotes(optimisticVotes - 1)
    }

    function showComments() {
        if (!viewComments) {
            setViewComments(true)
            setCommentLink(false)
        } else {
            setViewComments(false)
            setCommentLink(true)
            setViewCommentForm(false)
        }
    }

    function showCommentForm() {
        setViewCommentForm(true)
        setCommentInput("")
    }


    useEffect(() => {
        getArticleById(article_id).then((article) => {
            setArticle(article);
            setIsLoading(false)
            setOptimisticVotes(0)
        }).then(() => {
            getCommentsbyArticleId(article_id).then((comments) => {
                setComments(comments)
                setCommentsLoading(false)
                setOptimisticVotes(0)
            })
        })
    }, [article_id, commentsUpdated]);



    if (isLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        )
    }

    return (<>
        <h2>{article.title}</h2><br />
        <img src={article.article_img_url} className="article-image" /> <br /> <br /><br />
        <p><b>Author: </b>{article.author}<br /><b>Posted: </b>{(new Date(article.created_at)).toDateString()}</p><br />
        <p className="article-body">{article.body}</p>
        <br />
        <span><b>Votes: </b>{article.votes + optimisticVotes}</span><br />
        <button className="button" onClick={(increaseVotes)}>Up Vote</button>&nbsp;&nbsp;&nbsp;
        <button className="button" onClick={(decreaseVotes)}>Down Vote</button><br />
        {!voteError ? <p></p> : <p className="error-msg">Something wen't wrong, please try again!</p>}
        <br /><br />

        {commentLink ? <p><Link to="" onClick={showComments}>{article.comment_count} comments</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="" onClick={showCommentForm}>Add comment</Link></p> : <p>
            <Link to="" onClick={showComments}>Hide comments</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="" onClick={showCommentForm}>Add comment</Link></p>}
        <br />

        {!viewCommentForm ? <p></p> : <NewCommentForm article_id={article_id} commentInput={commentInput} setCommentInput={setCommentInput} currentUsername={currentUsername} commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated} />}

        {!viewComments ? <p></p> : <ul className="comment-list">
            {commentsLoading ? <div className="spinner-border" role="status">
                <span className="sr-only"></span></div> : <span>{comments.map((comment) => {
                    return <Comment comment={comment} key={comment.comment_id} currentUsername={currentUsername} commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated} />
                })}</span>}
        </ul>}

    </>
    )
}

export default SingleArticle