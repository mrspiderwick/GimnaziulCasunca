import React, { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export const AddStudentForm = () => {
  const [IDNP, setIdnp] = React.useState('');
  const [Name, setName] = React.useState('');
  const [Surname, setSurname] = React.useState('');
  const [Class, setClass] = React.useState('');
  const [Romana, setRomana] = React.useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [searchIDNP, setSearchIDNP] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [findStudent, setFindStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  

  let message = "";

    // adaugarea unui nou elev
    const AddStudent = async (e) => {
      e.preventDefault();
      try {
        message = "";
        const studentData = { IDNP, Name, Surname, Class, Romana };
        const response = await axios.post('/newstud', studentData);
        console.log(response.data); // Success message from the server
        setIdnp('');
        setName('');
        setSurname('');
        setClass('');
        setRomana('');
        message = "Student successfully added.";
        alert(message);
      } catch (error) {
        message = "There was a problem adding the elev or elev existe.";
        alert(message);
      }
    };

  // Toti elevii 
  const ShowElevi = async (e) => {
    e.preventDefault();
    try {
      const studentData = { IDNP, Name, Surname, Class, Romana };
      const response = await axios.get('/elevi', studentData);
      console.log(response.data); // Success message from the server
      setStudentsData(response.data); // Update the studentsData state variable
      setResponseMessage(''); // Clear the response message
    } catch (error) {
      console.error('Error creating elev:', error.message);
    }
  };

 //Un elev dupa idnp
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

 //Un elev in input pentru a putea modifica 
  const FindElev = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/elev/${IDNP}`);
      const elev = response.data;
      setFindStudent('');
      setName(elev.Name);
      setSurname(elev.Surname);
      setClass(elev.Class);
      setRomana(elev.Romana);
      setSearchError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchError('Student not found');
      } else {
        setSearchError('Server error');
      }
      setFindStudent(null);
    }
  };
  
  //modificarea elev 
  const ModifyElev = async (e) => {
    e.preventDefault();
    try {
      message = "";
      const studentData = { IDNP, Name, Surname, Class, Romana };
      const response = await axios.put(`/modstud/${IDNP}`, studentData);
      console.log(response.data); // Success message from the server
      setIdnp('');
      setName('');
      setSurname('');
      setClass('');
      setRomana('');
      message = "Student successfully modify.";
      alert(message);
    } catch (error) {
      message = "There was a problem modify the elev.";
      alert(message);
    }
  };

  const DelElev = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/delstud/${IDNP}`);
      alert("Elev is deleted succes");
      console.log(response.data); // Success message from the server
      setResponseMessage('Student deleted successfully.'); // Update the response message
    } catch (error) {
      alert("Eror");
      console.error('Error deleting student:', error.message);
      setResponseMessage('There was a problem deleting the student.'); // Update the response message
    }
  };
  

  return (

    <div>
    <Link to = "/"><h3><b>Home</b></h3></Link>

      <form>
      <h2>Add/Modify elev:</h2>
        <label>
          IDNP:
          <input type="text" value={IDNP} onChange={(e) => setIdnp(e.target.value)} />
        </label>
        <br />
        <button onClick={FindElev}>Find</button>
        <button onClick={ModifyElev}>Modify</button>
        <button onClick={DelElev}>Delete</button>
        <br />
        <label>
          Name:
          <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Surname:
          <input type="text" value={Surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <br />
        <label>
          Class:
          <input type="text" value={Class} onChange={(e) => setClass(e.target.value)} />
        </label>
        <br />
        <label>
          Romana:
          <input type="text" value={Romana} onChange={(e) => setRomana(e.target.value)} />
        </label>
        <br />
      </form>
      <button onClick={ShowElevi}>Show All</button>
      <button onClick={AddStudent}>Add Elev</button><br />

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
      
      {findStudent && <p>{searchError}</p>}
      {findStudent && (
        setName(findStudent.Name),
        setSurname(findStudent.Surname),
        setClass(findStudent.Class),
        setRomana(findStudent.Romana)
      )}



      <p>  {responseMessage}</p>
      {studentsData.length > 0 && (
        <div>
          <h2>Elevi:</h2>
          <ol>
            {studentsData.map((student, index) => (
              <li key={index}>
                IDNP: {student.IDNP} - {student.Name} {student.Surname} Romana: {student.Romana}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
