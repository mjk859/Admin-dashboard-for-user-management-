import React, { createContext, useState, useContext } from 'react';

const RolesContext = createContext();

export const useRoles = () => {
  return useContext(RolesContext);
};

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const updateRoles = (newRoles) => {
    setRoles(newRoles);
  };

  return (
    <RolesContext.Provider value={{ roles, updateRoles, permissions, setPermissions }}>
      {children}
    </RolesContext.Provider>
  );
};
