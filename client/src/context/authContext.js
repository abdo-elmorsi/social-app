import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import handleRq from "../helpers/handleRq";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (user) => {
    //TO DO
    setCurrentUser(user);
  };
  const logOut = async () => {
    //TO DO
    try {
      await handleRq("", "auth/logout", "");
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
