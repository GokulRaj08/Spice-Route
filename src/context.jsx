// useContext + useReducer: theme and cart state shared across the app
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.find((i) => i.id === action.item.id);
      return found
        ? state.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE": return state.filter((i) => i.id !== action.id);
    case "CLEAR": return [];
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"), cart, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
