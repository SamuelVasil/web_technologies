import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [nameFilter, setNameFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [birthYearFilter, setBirthYearFilter] = useState('');
  
  const [selectedUsers, setSelectedUsers] = useState([]); // Sledovanie vybraných používateľov
  
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
    axios.delete("http://localhost:3005/users", { data: { ids: [id] } })
      .then((response) => {
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully');
      })
      .catch((error) => {
        console.error('There was an error deleting the user:', error);
      });
  };

  const handleBulkDelete = () => {
    const idsToDelete = selectedUsers.map(user => user.id);
    if (idsToDelete.length === 0) {
      alert("No users selected for deletion.");
      return;
    }
  
    axios.delete("http://localhost:3005/users", { data: { ids: idsToDelete } })
      .then((response) => {
        setUsers(users.filter(user => !idsToDelete.includes(user.id)));
        setSelectedUsers([]); // Vyprázdni výber
        alert(`${idsToDelete.length} users deleted successfully.`);
      })
      .catch((error) => {
        console.error("Error deleting users:", error);
        alert("There was an error deleting the users.");
      });
  };
  

  const handleSelectUser = (user) => {
    const newSelectedUsers = [...selectedUsers];
    if (newSelectedUsers.includes(user)) {
      // Unselect the user
      const index = newSelectedUsers.indexOf(user);
      newSelectedUsers.splice(index, 1);
    } else {
      // Select the user
      newSelectedUsers.push(user);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);  // Deselect all
    } else {
      setSelectedUsers(users);  // Select all
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      user.state.toLowerCase().includes(stateFilter.toLowerCase()) &&
      user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
      user.birth_year.toString().includes(birthYearFilter)
    );
  });

  return (
    <div className="UserList">
      <h1>Users List</h1>

      {/* Filters UI */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by state"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by birth year"
          value={birthYearFilter}
          onChange={(e) => setBirthYearFilter(e.target.value)}
        />
      </div>

      {/* Bulk delete button */}
      <div className="bulk-actions">
        <button onClick={handleBulkDelete} disabled={selectedUsers.length === 0}>
          Delete Selected
        </button>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </th>
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleSelectUser(user)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.birth_year}</td>
                <td>{user.state}</td>
                <td>{user.email}</td>
                <td>{user.notes || "No notes"}</td>
                <td>{user.tel || "No telephone"}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
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
