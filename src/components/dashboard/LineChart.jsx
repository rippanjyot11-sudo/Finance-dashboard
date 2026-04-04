import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { transactions } from "../../data/mockData";

export default function CustomLineChart({ show = "balance" }) {
  // show = "balance" or "expenses"

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Calculate monthly totals
  const data = months.map((month) => {
    const monthlyTransactions = transactions.filter(
      (t) =>
        new Date(t.date).toLocaleString("default", { month: "short" }) ===
        month,
    );

    let totalIncome = 0;
    let totalExpense = 0;

    monthlyTransactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else if (t.type === "expense") totalExpense += t.amount;
    });

    const remainingBalance = totalIncome - totalExpense;

    return {
      name: month,
      balance: remainingBalance,
      expenses: totalExpense,
    };
  });

  return (
    <div className="bg-gray-800 p-4 rounded-xl h-[300px]">
      <h3 className="mb-4 text-white">
        Monthly {show === "balance" ? "Remaining Balance" : "Total Expenses"}
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#e5e7eb"
            tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 600 }}
            tickLine={{ stroke: "#e5e7eb" }}
          />

          <YAxis
            stroke="#e5e7eb"
            tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 600 }}
            tickLine={{ stroke: "#e5e7eb" }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={show === "balance" ? "balance" : "expenses"}
            stroke={show === "balance" ? "#34d399" : "#f87171"}
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
