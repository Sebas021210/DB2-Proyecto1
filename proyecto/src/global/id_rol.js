import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [rol, setRol] = useState(null);
  const [restaurantes, setRestaurantes] = useState([]);

  return (
    <UserContext.Provider value={{ id, setId, rol, setRol, setRestaurantes, restaurantes }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
