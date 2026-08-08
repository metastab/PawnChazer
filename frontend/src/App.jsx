//import { useState } from 'react'

import Header from './components/Header/Header'

import Panel_main from './components/profile/Panel_main'
import ProfileImage from './components/profile/dp'
import Rating from './components/profile/rating'

import './components/Header/Header.css'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <ProfileImage className="profile_image" src="/placeholder.jpg" size={110} />
        <Panel_main username="metastab" />
        <Rating rating={1211} peak={1444} type="Rapid" />
      </div>
    </>

  )
}

export default App
