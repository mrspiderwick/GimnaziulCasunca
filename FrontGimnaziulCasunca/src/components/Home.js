// HomePage.js
import React, { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export const Home = () => {
    const [searchIDNP, setSearchIDNP] = useState('');
    const [searchedStudent, setSearchedStudent] = useState(null);
    const [searchError, setSearchError] = useState('');
  
    const ShowElev = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`/elev/${searchIDNP}`);
        setSearchedStudent(response.data);
        setSearchError('');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setSearchError('Student not found');
        } else {
          setSearchError('Server error');
        }
        setSearchedStudent(null);
      }
    };
    
    return (
      
     <div>
      <h2>Search Elev:</h2>
        <form onSubmit={ShowElev}>
          <label>
            Search IDNP:
            <input type="text" value={searchIDNP} onChange={(e) => setSearchIDNP(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>
        {searchError && <p>{searchError}</p>}
        {searchedStudent && (
          <div>
            <h3>Elev Details</h3>
            <p>IDNP: {searchedStudent.IDNP}</p>
            <p>Name: {searchedStudent.Name}</p>
            <p>Surname: {searchedStudent.Surname}</p>
            <p>Class: {searchedStudent.Class}</p>
            <p>Roamana: {searchedStudent.Romana}</p>
          </div>
        )}
        
  <div>
    
      <Link to = "/login"><button><h3><b>Log In</b></h3></button></Link>
    
  </div>
     </div>
      
    );

};

export default Home;
