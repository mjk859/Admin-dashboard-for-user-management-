import React, { useState } from "react";
import { roles as mockRoles, permissions as mockPermissions } from "../services/mockData";

const Roles = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const handleSaveRole = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id ? editingRole : role
    );
    setRoles(updatedRoles);
    setEditingRole(null);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
  };

  const handleAddRole = () => {
    const newRole = {
      id: roles.length + 1,
      name: "New Role",
      permissions: ["Read"]
    };
    setRoles([...roles, newRole]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddRole}
      >
        Add New Role
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Role Name</th>
            <th className="border border-gray-300 p-2">Permissions</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="text-center">
              <td className="border border-gray-300 p-2">{role.name}</td>
              <td className="border border-gray-300 p-2">
                {role.permissions.join(", ") || "No Permissions"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleEditRole(role)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(editingRole !== null || newRole.name !== "") && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editingRole ? "Edit Role" : "Add New Role"}
            </h2>

            <label className="block mb-2">
              Role Name:
              <input
                type="text"
                className="border w-full p-2 rounded"
                value={editingRole ? editingRole.name : newRole.name}
                onChange={(e) =>
                  editingRole
                    ? setEditingRole({ ...editingRole, name: e.target.value })
                    : setNewRole({ ...newRole, name: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Permissions:
              <select
                multiple
                className="border w-full p-2 rounded"
                value={editingRole ? editingRole.permissions : newRole.permissions}
                onChange={(e) =>
                  editingRole
                    ? setEditingRole({
                        ...editingRole,
                        permissions: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    : setNewRole({
                        ...newRole,
                        permissions: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                }
              >
                {mockPermissions.map((permission) => (
                  <option key={permission} value={permission}>
                    {permission}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setEditingRole(null);
                  setNewRole({ name: "", permissions: [] });
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (editingRole) {
                    handleSaveRole();
                  } else {
                    handleAddRole();
                  }
                }}
              >
                {editingRole ? "Save" : "Add Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
