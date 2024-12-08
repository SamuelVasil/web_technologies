import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    birth_year: '',
    state: '',
    email: '',
    notes: '',  
    tel: '',    
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the form data to the server
    axios.post('http://localhost:3005/users', userData)
      .then((response) => {
        alert('User registered successfully');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="Register">
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Birth Year</label>
          <input
            type="number"
            name="birth_year"
            value={userData.birth_year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={userData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Notes-optional</label>
          <input
            name="notes"
            value={userData.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telephone-optional</label>
          <input
            type="tel"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
