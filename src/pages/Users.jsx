import React, { useState, useEffect } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { users as mockUsers } from "../services/mockData";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleAdd = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: `newuser${users.length + 1}@example.com`,
      role: "Viewer",
      status: "Active",
    };
    setUsers([...users, newUser]);
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
    );
    setFilteredUsers(result);
  };

  const handleSort = (criteria) => {
    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setFilteredUsers(sorted);
    setShowSortMenu(false);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <button
        className="bg-green-500 text-white px-7 py-1 mb-4 rounded absolute top-16 right-36 rounded-lg hover:bg-green-600"
        onClick={handleAdd}
      >
        Add User
      </button>
      <button
        className="border text-green px-7 py-1 mb-4 rounded absolute top-16 right-4 rounded-lg hover:bg-green-100"
        onClick={() => navigate("/roles")}
      >
        Edit roles
      </button>
      <div className="flex justify-between items-center mb-5 w-1/2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={handleSearch}
          className="flex-1 mr-3 px-3 py-2 rounded border border-gray-300"
        />
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaSortAmountDown className="text-lg text-gray-600" />
          </button>
          {showSortMenu && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-lg z-10"
            >
              <button
                onClick={() => handleSort("name")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Sort by Name
              </button>
              <button
                onClick={() => handleSort("role")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Sort by Role
              </button>
              <button
                onClick={() => handleSort("status")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Sort by Status
              </button>
            </div>
          )}
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className={`text-center ${
                editingUser?.id === user.id
                  ? "bg-yellow-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, status: e.target.value })
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  user.status
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUser?.id === user.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
