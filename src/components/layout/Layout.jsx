import Sidebar from "./Sidebar";
import Header from "./Header";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Layout({ children }) {
  const { darkMode } = useContext(AppContext);

  return (
    <div
      className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className={`p-4 overflow-y-auto ${darkMode ? "" : "bg-white"}`}>
          {children}
        </main>
      </div>
    </div>
  );
} // bnasically i included sidebar and herder here so that dahsboard mai mai inhe directly use kr lu
