import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import UpdateListing from './pages/UpdateListing';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} /> 
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} /> 
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}
