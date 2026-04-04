import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const { role, setRole, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h2 className="text-lg font-bold">WELCOME RIPPAN</h2>

      <div className="flex items-center gap-3">
        
        {/*Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Role Switch */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-700 p-2 rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}
