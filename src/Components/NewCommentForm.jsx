import { addComment } from '../API'
import { useState } from 'react'

function NewCommentForm ({article_id, commentInput, setCommentInput, currentUsername, commentsUpdated, setCommentsUpdated}){

const [msg, setMsg] = useState("")
const [commentBox, setCommentBox] = useState("comment-input")
const [isPosted, setIsPosted] = useState(false)
const [isLoading, setIsLoading] = useState(false)

function handleCommentInput(event){
    setCommentInput(event.target.value)
    setCommentBox("comment-input")
    setMsg("")
}

function handleSubmit(event){

    const commentObj = {
    username: currentUsername,
        body: commentInput,}

    event.preventDefault()
    if(!commentInput){
        setMsg("Please enter some text!")
        setCommentBox("bad-input")
    } else{
        setIsLoading(true)
        
    addComment(commentObj, article_id).then(()=>{
        console.log("comment posted!")
        setIsPosted(true)
        setIsLoading(false)
        setCommentsUpdated(!commentsUpdated)
    }).catch((error)=>{
       console.log(error)
    })
}}

function handleRefresh(){
    setCommentInput("")
    setIsPosted(false)
    setIsLoading(false)
}


    return (
        <>
        {isLoading ? <><div class="spinner-border" role="status"><span class="sr-only"></span>
            </div><br/><br/></> : (!isPosted ?  <><form><textarea className={commentBox} placeholder="Write your comment here..." onChange={handleCommentInput} value={commentInput} required></textarea></form>
        <div className="error-msg">{msg}</div></> : <><br/><p className="success-msg"><b>Your comment was posted!</b></p><br/></>)}
        {isPosted ? <button className="button" onClick={handleRefresh}>Comment again</button> : <button className="button" onClick={handleSubmit}>Submit</button>}<br/><br/>
        </>
)}

export default NewCommentForm