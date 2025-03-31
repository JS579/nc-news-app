import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Articles from './Components/Articles'
import {Route, Routes} from  "react-router"
import HomePage from './Components/HomePage'
import SingleArticle from './Components/SingleArticle'


function App() {

  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  )
}

export default App
