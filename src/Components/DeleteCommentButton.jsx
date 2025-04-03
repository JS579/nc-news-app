import { useState } from "react"
import { deleteComment } from "../API"

function DeleteCommentButton ({comment_id, commentsUpdated, setCommentsUpdated}){

    const [isLoading, setIsLoading] = useState(false)

function handleClick(){
    setIsLoading(true)
    deleteComment(comment_id).then(()=>{
        setCommentsUpdated(!commentsUpdated)
        setIsLoading(false)
    })
}


    return <button className="button delete-button" onClick={handleClick}>{isLoading ? <div className="spinner-border button-spinner" role="status">
        <span className="sr-only"></span></div> : <span>Delete comment</span>}</button>
}

export default DeleteCommentButton