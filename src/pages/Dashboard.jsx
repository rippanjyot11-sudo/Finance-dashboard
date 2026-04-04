import { useContext } from "react";
import Layout from "../components/layout/Layout";
import SummaryCard from "../components/dashboard/SummaryCard";
import CustomLineChart from "../components/dashboard/LineChart";
import CustomPieChart from "../components/dashboard/PieChart";
import { AppContext } from "../context/AppContext";
export default function Dashboard() {
  const { transactions } = useContext(AppContext);

  //  Total Income
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  //  Total Expense
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  //  Balance
  const balance = income - expense;

  return (
    <Layout>
      <div className="space-y-8 p-6 text-white">
        <h1 className="text-2xl font-bold">Overview</h1>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard
            title="Total Remaining Balance"
            amount={balance}
            color="text-green-400 font-bold  text-2xl"
          />
          <SummaryCard
            title="Total Income"
            amount={income}
            color="text-blue-400 font-bold  text-2xl"
          />
          <SummaryCard
            title="Total Expenses"
            amount={expense}
            color="text-red-400 font-bold text-2xl"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[450px] flex flex-col">
            <CustomLineChart />
          </div>

          <div className="h-[400px] flex flex-col">
            <CustomPieChart />
          </div>
        </div>
        {/* Transactions */}
      </div>
    </Layout>
  );
}
