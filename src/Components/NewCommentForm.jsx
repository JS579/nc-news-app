import { addComment } from '../API'
import { useState } from 'react'

function NewCommentForm({ article_id, commentInput, setCommentInput, currentUsername, commentsUpdated, setCommentsUpdated }) {

    const [msg, setMsg] = useState("")
    const [commentBox, setCommentBox] = useState("comment-input")
    const [isPosted, setIsPosted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [commentError, setCommentError] = useState(false)

    function handleCommentInput(event) {
        setCommentInput(event.target.value)
        setCommentBox("comment-input")
        setMsg("")
    }

    function handleSubmit(event) {

        const commentObj = {
            username: currentUsername,
            body: commentInput,
        }

        event.preventDefault()
        if (!commentInput) {
            setMsg("Please enter some text!")
            setCommentBox("bad-input")
        } else {
            setIsLoading(true)

            addComment(commentObj, article_id).then(response => {
                console.log(response)
                if (response.status === 201) {
                    console.log("comment posted!")
                    setIsPosted(true)
                    setIsLoading(false)
                    setCommentsUpdated(!commentsUpdated)
                    setCommentError(false)
                } else if(response.message === "Network Error"){
                    setIsLoading(false)
                    setCommentError(true)
                    setIsPosted(true)
                }
            })
        }
    }

    function handleRefresh() {
        setCommentInput("")
        setIsPosted(false)
        setIsLoading(false)
    }


    return (
        <>
            {isLoading ? <><div className="spinner-border" role="status"><span className="sr-only"></span>
            </div><br /><br /></> : (!isPosted ? <><form><textarea className={commentBox} placeholder="Write your comment here..." onChange={handleCommentInput} value={commentInput} required></textarea></form>
                <div className="error-msg">{msg}</div></> : commentError ? <div className="error-msg">Your comment could not be posted, please try again!</div> : <><br /><p className="success-msg"><b>Your comment was posted!</b></p><br /></>)}
            {isPosted ? <button className="button" onClick={handleRefresh}>Comment again</button> : <button className="button" onClick={handleSubmit}>Submit</button>}<br /><br />
        </>
    )
}

export default NewCommentForm