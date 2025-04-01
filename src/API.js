import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-news-1qem.onrender.com/api"
})

function getArticles(){
    return api.get("/articles").then(({data})=>{
        return data.articles
    })
}

function getTopics(){
    return api.get("/topics").then(({data})=>{
        return data.topics
    })
}

function getArticlesByTopic(searchParams) {
    return api.get(`/articles?topic=${searchParams}`).then(({data})=>{
        return data.articles
    })
}

function getArticleById(id) {
    return api.get(`/articles/${id}`).then(({data})=>{
        return data.article
    })
}


export { getArticles, getTopics, getArticlesByTopic, getArticleById }