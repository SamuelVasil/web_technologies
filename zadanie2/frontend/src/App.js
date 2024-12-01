
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import UserList from './UserList';

function App() {
  return (
    <Router>
      <div className="App">
      
        <header className="App-header">
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/userlist">User List</Link></li> {/* New link to UserList */}
            </ul>
          </nav>
        </header>

      
        <div className="content">
          <Routes>
            <Route path="/" element={<h2>ZADANIE 2 PLACEHOLDER</h2>} /> {/* Placeholder */}
            <Route path="/register" element={<Register />} />
            <Route path="/userlist" element={<UserList />} /> {/* New route for UserList */}
          </Routes>
        </div>

 
        <footer className="App-footer">
          <p>webove technologie 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
