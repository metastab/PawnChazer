//import { useState } from 'react'

import Header from './components/Header/Header'

import Panel_main from './components/profile/Panel_main'
import ProfileImage from './components/profile/dp'
import Rating from './components/profile/rating'
import GamesPanel from './components/profile/games'
import Mainbody from './components/profile/body-section/Mainbody'
import Footer from './components/footer/Footer'
import DailyPuzzle from './components/chessboard/DailyPuzzle'
import FrontAnalytics from './components/analytics/Front-Analytics'
import Empty from './components/Empty'

import './components/Header/Header.css'
import './App.css'
import './components/profile/games.css'
import './components/footer/footer.css'
import './components/analytics/Analytics.css'

function App() {

  return (
    <>
      <Header />

      <div className="profile-container">
        <ProfileImage className="profile_image" src="/placeholder.jpg" size={110} />
        <Panel_main username="metastab"/>
        <Rating rating={1211} peak={1444} type="Rapid" />
      </div>

      <GamesPanel/>
      <Mainbody/>
      <DailyPuzzle/>
      <FrontAnalytics/>
      <Empty/>
      <Footer/>
    </>
  )
}

export default App
