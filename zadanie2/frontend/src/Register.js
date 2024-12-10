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

  const [errors, setErrors] = useState({
    name: '',
    birth_year: '',
    state: '',
    email: '',
    tel: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;  // Only letters and spaces
    const stateRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces

    // Validate Name
    if (!nameRegex.test(userData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
    }

    // Validate State
    if (!stateRegex.test(userData.state)) {
      newErrors.state = 'State should contain only letters and spaces';
    }


    // If there are errors, return false, else return true
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // If valid, send the form data to the server
      axios.post('http://localhost:3005/users', userData)
        .then((response) => {
          alert('User registered successfully');
          // Reset the form after successful registration
          setUserData({
            name: '',
            birth_year: '',
            state: '',
            email: '',
            notes: '',
            tel: '',
          });
          setErrors({});  // Optionally reset errors as well
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    }
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
            style={{ borderColor: errors.name ? 'red' : '' }}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Birth Year</label>
          <input
            type="number"
            name="birth_year"
            value={userData.birth_year}
            onChange={handleChange}
            required
            style={{ borderColor: errors.birth_year ? 'red' : '' }}
          />
          {errors.birth_year && <span className="error">{errors.birth_year}</span>}
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={userData.state}
            onChange={handleChange}
            required
            style={{ borderColor: errors.state ? 'red' : '' }}
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
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
