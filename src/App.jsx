import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Insights from "./components/dashboard/Insights";
import TransactionTable from "./components/transactions/TransactionTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/transactions" element={<TransactionTable />} />
      </Routes>
    </Router>
  );
}

export default App;
