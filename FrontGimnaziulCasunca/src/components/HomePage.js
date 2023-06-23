// HomePage.js
import React from 'react';
import {Link} from 'react-router-dom';


export const HomePage = () => {
  return (
  <>
    <h1>If login then modify</h1>;
    <Link to = "/modify"><h3><b>Modify</b></h3></Link>
    <Link to = "/"><h3><b>Home</b></h3></Link>
  </>
)};

export default HomePage;
