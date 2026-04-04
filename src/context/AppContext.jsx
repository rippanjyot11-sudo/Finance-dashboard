import { createContext, useState, useEffect } from "react";
import { transactions as mockData } from "../data/mockData";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");

  // LocalStorage se load
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockData;
  });

  //  Dark Mode
  const [darkMode, setDarkMode] = useState(true);

  //  Save to LocalStorage jab bhi change ho
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        transactions,
        setTransactions,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
