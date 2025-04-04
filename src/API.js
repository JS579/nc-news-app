import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-news-1qem.onrender.com/api"
})

function getArticles(topic, sortBy, order) {

    let url = "/articles?"

    if(topic){
        url += `topic=${topic}&`
    }
    if(sortBy){
        url += `sort_by=${sortBy}&`
    }
    if(order){
        url += `order=${order}`
    }
    
        return api.get(url).then(({ data }) => {
            return data.articles
        })

}

function getTopics() {
    return api.get("/topics").then(({ data }) => {
        return data.topics
    })
}

function getArticleById(id) {
    return api.get(`/articles/${id}`).then(({ data }) => {
        return data.article
    })
}

function getCommentsbyArticleId(id) {
    return api.get(`/articles/${id}/comments`).then(({ data }) => {
        return data.commentsByArticle
})
}

function modifyArticleById(id, num){
    return api.patch(`/articles/${id}`, {inc_votes: num})
}

function addComment(commentObj, id){
    return api.post(`/articles/${id}/comments`, commentObj).then((response)=>{
       return response
    }).catch((error)=>{
        return error
    })
}

function deleteComment(comment_id){
    console.log(comment_id)
    return api.delete(`/comments/${comment_id}`)
}

export { getArticles, getTopics, getArticleById, getCommentsbyArticleId, modifyArticleById, addComment, deleteComment }