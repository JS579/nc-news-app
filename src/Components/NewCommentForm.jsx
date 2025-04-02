import { addComment } from '../API'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function NewCommentForm ({article_id, optimisticComments, setOptimisticComments, commentInput, setCommentInput}){

const [msg, setMsg] = useState("")
const [commentBox, setCommentBox] = useState("comment-input")
const [isPosted, setIsPosted] = useState(false)

function handleCommentInput(event){
    setCommentInput(event.target.value)
    setCommentBox("comment-input")
    setMsg("")
}

function handleSubmit(event){

    const commentObj = {
    username: "tickle122",
        body: commentInput,}

    event.preventDefault()
    if(!commentInput){
        setMsg("Please enter some text!")
        setCommentBox("bad-input")
    } else{
    addComment(commentObj, article_id).then(()=>{
        console.log("comment posted!")
        setIsPosted(true)
    }).catch((error)=>{
       console.log(error)
    })
}}

function handleRefresh(){
    setCommentInput("")
    setIsPosted(false)
}


    return (
        <>
        {isPosted ? <><br/><p className="success-msg"><b>Your comment was posted!</b></p><br/></> : <><form><textarea className={commentBox} placeholder="Write your comment here..." onChange={handleCommentInput} value={commentInput} required></textarea></form>
        <div className="error-msg">{msg}</div></>}
        {isPosted ? <button className="button" onClick={handleRefresh}>Comment again</button> : <button className="button" onClick={handleSubmit}>Submit</button>}<br/><br/>
        </>
)}

export default NewCommentForm