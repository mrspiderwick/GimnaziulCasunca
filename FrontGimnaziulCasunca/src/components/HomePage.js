// HomePage.js
import React from 'react';
import {Link} from 'react-router-dom';


export const HomePage = () => {
  return (
  <div>
  
    <Link to = "/"><button><h3><b>Home</b></h3></button></Link>
    <h1>If login then modify</h1>
    
    <Link to = "/modify"><button><h3><b>Modify</b></h3></button></Link>
    
    
  </div>
)};

export default HomePage;
