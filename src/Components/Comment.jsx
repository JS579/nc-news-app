import DeleteCommentButton from "./DeleteCommentButton";
import { useState } from "react";
import { modifyCommentById } from "../API";


function Comment({comment, currentUsername, commentsUpdated, setCommentsUpdated }){

const [optimisticVotes, setOptimisticVotes] = useState(0)
const [voteError, setVoteError] = useState(false)

    function increaseVotes() {
        modifyCommentById(comment.comment_id, 1).catch(() => {
            setVoteError(true)
            setOptimisticVotes((currentOptimisticVotes) => {
                return currentOptimisticVotes - 1
            })
        })
        setVoteError(false)
        setOptimisticVotes(optimisticVotes + 1)
    }

    function decreaseVotes() {
        modifyCommentById(comment.comment_id, -1).catch(() => {
            setVoteError(true)
            setOptimisticVotes((currentOptimisticVotes) => {
                return currentOptimisticVotes + 1
            })
        })
        setVoteError(false)
        setOptimisticVotes(optimisticVotes - 1)
    }


    return (
        <>
        
    <li className="comment"><p><b>{comment.author}</b> <i>({(new Date(comment.created_at)).toDateString()})</i>
    </p><p>{comment.body}</p>
    <span><b>Votes: </b>{comment.votes + optimisticVotes}</span><br/>
    <button id="up-vote-comment" className="button comment-button" onClick={increaseVotes}>Up Vote</button>&nbsp;
    <button className="button comment-button" onClick={decreaseVotes}>Down Vote</button>
    {comment.author === currentUsername ? <><br/><DeleteCommentButton currentUsername={currentUsername} comment_id={comment.comment_id} commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated}/></> : <></>}
    {!voteError ? <span></span> : <><br/><span className="error-msg">Something went wrong, please try again!</span></>}<br/>
    </li>
    </>
    )
}

export default Comment