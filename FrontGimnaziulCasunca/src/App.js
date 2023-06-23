import "./App.css"
// import React, {useState} from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home'
import {HomePage} from './components/HomePage'
import {AboutPage} from './components/About'
import {AddStudentForm} from './components/Route'

export const App = () => {
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/login" element = {<HomePage/>} />
        <Route path="/about" element = {<AboutPage/>} />
        <Route path="/modify" element = {<AddStudentForm/>} />
      </Routes>
    </Router>
    </>
    );
}
export default App;
