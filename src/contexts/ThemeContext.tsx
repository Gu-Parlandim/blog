import React, { createContext, useEffect, useState } from "react";
import useThemeDetector from "@hooks/useThemeDetector";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const userTheme = useThemeDetector();

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(userTheme);
  }, [userTheme]);

  const toggleTheme = () => {
    localStorage.setItem("theme", theme == "light" ? "dark" : "light");
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
