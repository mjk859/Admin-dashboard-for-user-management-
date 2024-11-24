import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiKey, FiSettings } from "react-icons/fi";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="w-1/5 bg-gray-900 h-screen text-white flex flex-col">
          <div className="text-center py-6 text-xl font-bold bg-gray-800">
            Cyborg
          </div>
          
          <nav className="flex-1 p-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 rounded-lg text-sm transition ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <FiHome className="mr-3 text-lg" />
              Dashboard
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 rounded-lg text-sm transition ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <FiUsers className="mr-3 text-lg" />
              Users
            </NavLink>
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 rounded-lg text-sm transition ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <FiKey className="mr-3 text-lg" />
              Roles
            </NavLink>
            <NavLink
              to="/permissions"
              className={({ isActive }) =>
                `flex items-center py-3 px-4 rounded-lg text-sm transition ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <FiSettings className="mr-3 text-lg" />
              Permissions
            </NavLink>
          </nav>
          
          <div className="p-4 text-sm text-gray-500 bg-gray-800">
            © 2024 MyApp
          </div>
        </div>

        <div className="w-4/5 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
