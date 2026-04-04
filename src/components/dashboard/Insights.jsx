import { useState } from "react";
import { transactions } from "../../data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Insights() {
  const MONTHS = [
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

  // User selection
  const [currentMonth, setCurrentMonth] = useState("Dec");
  const [prevMonth, setPrevMonth] = useState("Nov");

  // Filter only expenses
  const expenses = transactions.filter((t) => t.type === "expense");

  // Handle completely empty transactions
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Insights</h1>
        <p className="text-gray-400 mt-4">No transaction data available</p>
      </div>
    );
  }

  // Handle no expense data
  if (expenses.length === 0) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Insights</h1>
        <p className="text-gray-400 mt-4">No expense data available</p>
      </div>
    );
  }

  // Month-wise aggregation
  const monthMap = {};
  expenses.forEach((t) => {
    const [year, month] = t.date.split("-");
    const m = new Date(year, month - 1).toLocaleString("default", {
      month: "short",
    });
    monthMap[m] = (monthMap[m] || 0) + t.amount;
  });

  const currentExpense = monthMap[currentMonth] || 0;
  const prevExpense = monthMap[prevMonth] || 0;
  const isSameMonth = currentMonth === prevMonth;

  const diff = currentExpense - prevExpense;
  const percent =
    prevExpense !== 0 ? ((diff / prevExpense) * 100).toFixed(1) : 0;

  // Highest & Lowest
  let highestMonth = null,
    lowestMonth = null;
  let max = -Infinity,
    min = Infinity;
  Object.keys(monthMap).forEach((m) => {
    if (monthMap[m] > max) {
      max = monthMap[m];
      highestMonth = m;
    }
    if (monthMap[m] < min) {
      min = monthMap[m];
      lowestMonth = m;
    }
  });

  // Category aggregation
  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#34d399", "#60a5fa", "#f87171", "#fbbf24"];
  const topCategory =
    pieData.length > 0
      ? pieData.reduce((a, b) => (a.value > b.value ? a : b))
      : null;

  // Bar chart data
  const barData = MONTHS.map((m) => ({
    name: m,
    expense: monthMap[m] || 0,
  }));

  return (
    <div className="p-4 md:p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Insights</h1>

      {/* Month selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 mb-1">Current Month</p>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 mb-1">Compare Against</p>
          <select
            value={prevMonth}
            onChange={(e) => setPrevMonth(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Same month warning */}
      {isSameMonth && (
        <div className="bg-yellow-600 p-3 rounded">
          Please select different months to compare.
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl">
          <h3>Highest Spending</h3>
          {highestMonth ? (
            <p className="text-red-400 font-bold">
              {highestMonth} - ₹{max}
            </p>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <h3>Lowest Spending</h3>
          {lowestMonth ? (
            <p className="text-green-400 font-bold">
              {lowestMonth} - ₹{min}
            </p>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <h3>Monthly Comparison</h3>
          <p className="mt-2">
            <span className="text-gray-400">Current:</span>{" "}
            <span className="text-blue-400 font-bold">{currentMonth}</span>
          </p>
          <p>
            <span className="text-gray-400">Against:</span>{" "}
            <span className="text-yellow-400 font-bold">{prevMonth}</span>
          </p>
          {!isSameMonth && (
            <p
              className={diff > 0 ? "text-red-400 mt-2" : "text-green-400 mt-2"}
            >
              {diff > 0 ? "↑" : "↓"} ₹{Math.abs(diff)} ({percent}%)
            </p>
          )}
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <h3>Top Category</h3>
          {topCategory ? (
            <p className="text-purple-400 font-bold">
              {topCategory.name} - ₹{topCategory.value}
            </p>
          ) : (
            <p className="text-gray-400">No category data</p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Trend */}
        <div className="bg-gray-800 p-4 rounded-xl h-[350px] overflow-x-auto">
          <h3 className="mb-2">Monthly Trend</h3>
          <div style={{ width: barData.length * 70, height: 300 }}>
            {" "}
            {/* 70px per bar */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ bottom: 50 }}>
                <XAxis
                  dataKey="name"
                  stroke="#fff"
                  tick={{ fontSize: 12 }}
                  interval={0} // show all labels
                  angle={-45} // tilt labels
                  textAnchor="end" // align rotated labels
                />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="expense" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-800 p-4 rounded-xl h-[350px]">
          <h3 className="mb-2">Category Breakdown</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">No category data</p>
          )}
        </div>
      </div>

      {/* Smart Insights */}
      <div className="bg-gray-800 p-4 rounded-xl">
        {!isSameMonth ? (
          <>
            <p>
              In <span className="text-blue-400">{currentMonth}</span>, you
              spent ₹{currentExpense}.
            </p>
            <p>
              Compared to <span className="text-yellow-400">{prevMonth}</span>,
              your spending{" "}
              <span className={diff > 0 ? "text-red-400" : "text-green-400"}>
                {diff > 0 ? "increased" : "decreased"}
              </span>{" "}
              by ₹{Math.abs(diff)} ({percent}%).
            </p>
            {topCategory && (
              <p>
                Most of your spending is on{" "}
                <span className="text-purple-400 font-semibold">
                  {topCategory.name}
                </span>
                .
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-400">
            Select different months to see meaningful insights.
          </p>
        )}
      </div>
    </div>
  );
}
