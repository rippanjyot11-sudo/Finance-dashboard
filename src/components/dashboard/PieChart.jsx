import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { transactions } from "../../data/mockData";
import { useState } from "react";

export default function CustomPieChart() {
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  const COLORS = ["#34d399", "#60a5fa", "#f87171", "#fbbf24"];
  const CATEGORIES = ["Shopping", "Food", "Travel", "Health"];

  // Filter transactions for selected month
  const filtered = transactions.filter((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    return (
      month.toLowerCase() === selectedMonth.toLowerCase() &&
      t.type === "expense"
    );
  });

  // Group by category
  const categoryMap = {};
  CATEGORIES.forEach((cat) => (categoryMap[cat] = 0));

  filtered.forEach((t) => {
    if (categoryMap[t.category] !== undefined) {
      categoryMap[t.category] += t.amount;
    }
  });

  const data = CATEGORIES.map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl h-full flex flex-col">
      <h3 className="mb-2 text-white">Monthly Expenses Breakdown</h3>

      {/* Month Dropdown in PieChart */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="mb-4 p-2 bg-gray-700 rounded text-white"
      >
        {[
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
        ].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Pie Chart */}
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-white">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span>
              {item.name} - ₹{item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
