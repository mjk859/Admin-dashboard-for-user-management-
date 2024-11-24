import React from "react";
import { roles as mockRoles } from "../services/mockData";

const Permissions = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Permissions Overview</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Permissions</th>
          </tr>
        </thead>
        <tbody>
          {mockRoles.map((role) => (
            <tr key={role.id} className="text-center">
              <td className="border border-gray-300 p-2">{role.name}</td>
              <td className="border border-gray-300 p-2">
                {role.permissions.length > 0
                  ? role.permissions.join(", ")
                  : "No Permissions"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
