import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Articles from './Components/Articles'
import {Route, Routes} from  "react-router"
import HomePage from './Components/HomePage'
import SingleArticle from './Components/SingleArticle'
import ErrorPage from './Components/ErrorPage'
import Topics from './Components/Topics'


function App() {

  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/articles/:article_id" element={<SingleArticle />} />
      <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
