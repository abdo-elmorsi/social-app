import { createContext, useState } from "react";
export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("user"))?.darkMode || false);
  const toggle = () => setDarkMode(!darkMode);
  const updateDarkMode = (status) => setDarkMode(status);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle, updateDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
