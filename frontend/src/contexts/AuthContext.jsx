import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getMe, logout } from "@/backend/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return;
    }

    (async () => {
      setLoading(true);

      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        localStorage.removeItem('token');
        setError(error.message);
        console.error(error);
      }

      setLoading(false);
    })();
  }, []);

  if (!token || error) {
    return (
      <Navigate to="/login" />
    );
  }

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
