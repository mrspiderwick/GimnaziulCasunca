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

  /*
  const [searchIDNP, setSearchIDNP] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  React.useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => {
        setSearchedStudent(data.searchIDNP)
      });
  }, []);

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
   </div>
    
  );
  */
}
export default App;
