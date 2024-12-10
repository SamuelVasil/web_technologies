import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import UserList from './UserList';
import GDPR from './gdpr';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/userlist">User List</Link></li>
              <li><Link to="/gdpr">GDPR Notice</Link></li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <h2>PROCESORY</h2>
                  <a 
                    href="http://localhost:3005/pages/index.html" 
                    rel="noopener noreferrer" 
                    className="external-link"
                  >
                    Read more about processors
                  </a>
                </div>
              } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/gdpr" element={<GDPR />} />
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
