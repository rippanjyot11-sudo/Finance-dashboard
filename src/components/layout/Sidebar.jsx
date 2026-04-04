import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation(); // active route detect karega

  const linkStyle = (path) =>
    `block p-3 rounded cursor-pointer text-lg ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-gray-800 p-4 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">MyFinance</h1>

      <ul className="space-y-3">
        <li>
          <Link to="/" className={linkStyle("/")}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/transactions" className={linkStyle("/transactions")}>
            Transactions
          </Link>
        </li>

        <li>
          <Link to="/insights" className={linkStyle("/insights")}>
            Insights
          </Link>
        </li>
      </ul>
    </div>
  );
}
