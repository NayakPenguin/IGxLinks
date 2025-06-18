import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = loading, false = not logged in, object = logged in
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
        const userData = await res.json();
        if (userData?.email) setUser(userData);
        else setUser(false); // not logged in
      } catch (err) {
        console.error("Auth error:", err);
        setUser(false);
      }
    };

    fetchUser();
  }, [API_URL]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
