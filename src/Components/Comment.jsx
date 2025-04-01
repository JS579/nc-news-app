

function Comment({comment}){
    return (
        <>
        
    <li className="comment"><p><b>{comment.author}</b> <i>({(new Date(comment.created_at)).toDateString()})</i>
    </p><p>{comment.body}</p>
    <span><b>Votes: </b>{comment.votes}</span>
    </li>
    </>
    )
}

export default Comment