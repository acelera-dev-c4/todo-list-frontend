import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // window.location.href = '/';
        return;
      }

      try {
        const response = await axios.get<User>('http://localhost:5042/User', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setUserData(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};