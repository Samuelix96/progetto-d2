import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookDetail from './Pages/BookDetail'
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import PostContext from './Context/PostContext'



const App = () =>
{
  return (
    <BrowserRouter>
      <PostContext>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/bookdetail/:bookasin" element={ <BookDetail /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
      </PostContext>
    </BrowserRouter>
  )
}

export default App
