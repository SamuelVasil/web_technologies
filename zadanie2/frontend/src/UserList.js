
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');  

  
  useEffect(() => {
    axios.get('http://localhost:3005/users')
      .then((response) => {
        setUsers(response.data);  
      })
      .catch((error) => {
        console.error('There was an error fetching the users:', error);
      });
  }, []);

 
  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) {
        return newSortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return newSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

 
  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:3005/users/${id}`)
      .then((response) => {
       
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully');
      })
      .catch((error) => {
        console.error('There was an error deleting the user:', error);
      });
  };

  return (
    <div className="UserList">
      <h1>Users List</h1>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('birth_year')}>Birth Year</th>
              <th onClick={() => handleSort('state')}>State</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th>Notes</th>
              <th>Telephone</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.birth_year}</td>
                <td>{user.state}</td>
                <td>{user.email}</td>
                <td>{user.notes || "No notes"}</td>
                <td>{user.tel || "No telephone"}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button> {/* Delete Button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
