import DeleteCommentButton from "./DeleteCommentButton";


function Comment({comment, currentUsername, commentsUpdated, setCommentsUpdated}){

    return (
        <>
        
    <li className="comment"><p><b>{comment.author}</b> <i>({(new Date(comment.created_at)).toDateString()})</i>
    </p><p>{comment.body}</p>
    <span><b>Votes: </b>{comment.votes}</span>
    {comment.author === currentUsername ? <DeleteCommentButton currentUsername={currentUsername} comment_id={comment.comment_id} commentsUpdated={commentsUpdated} setCommentsUpdated={setCommentsUpdated}/> : <></>}
    </li>
    </>
    )
}

export default Comment