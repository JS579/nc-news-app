import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import NavBar from './Components/NavBar'
import Articles from './Components/Articles'
import {Route, Routes} from  "react-router"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <Routes>
      <Route path="/" element={<Articles />} />
      </Routes>
    </>
  )
}

export default App
