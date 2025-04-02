import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-news-1qem.onrender.com/api"
})

function getArticles(searchParams) {
    if (!searchParams) {
        return api.get("/articles").then(({ data }) => {
            return data.articles
        })
    } else {
        return api.get(`/articles?topic=${searchParams}`).then(({ data }) => {
            return data.articles
        })
    }
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
        console.log(response)
    }).catch((error)=>{
        console.log(error);
    })
}

export { getArticles, getTopics, getArticleById, getCommentsbyArticleId, modifyArticleById, addComment }