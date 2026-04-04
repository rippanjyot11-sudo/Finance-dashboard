import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function TransactionTable() {
  const { role, transactions, setTransactions } = useContext(AppContext);

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [newRow, setNewRow] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const CATEGORIES = ["Shopping", "Food", "Travel", "Health"];

  //FILTER
  let filteredTransactions = transactions.filter((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    return (
      (selectedMonth === "All" || month === selectedMonth) &&
      (selectedCategory === "All" || t.category === selectedCategory) &&
      (t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase()) ||
        t.amount.toString().includes(search))
    );
  });

  //SORT
  if (sortConfig.key) {
    filteredTransactions.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Conversion of  date to timestamp for comparisonnn
      if (sortConfig.key === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // DELETE
  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  //  SAVE EDIT
  const handleSave = (index, updatedRow) => {
    const updated = [...transactions];
    updated[index] = updatedRow;
    setTransactions(updated);
    setEditIndex(null);
  };

  // ADD NEW transaction
  const handleAdd = () => {
    if (!newRow?.amount || !newRow?.category || !newRow?.date) return;
    setTransactions([
      ...transactions,
      { ...newRow, amount: Number(newRow.amount) },
    ]);
    setNewRow(null);
  };

  // CSV EXPORT
  const handleExportCSV = () => {
    const headers = ["Date", "Amount", "Category", "Type"];
    const rows = filteredTransactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.amount,
      t.category,
      t.type,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //  HANDLE SORT CLICK
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl text-white">
      <h3 className="text-lg font-bold mb-4">Transaction History</h3>

      {/* FILTERS + EXPORT */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="All">All Months</option>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-gray-700 rounded flex-1"
        />

        {role === "admin" && (
          <button
            onClick={() =>
              setNewRow({ amount: "", category: "", type: "expense", date: "" })
            }
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Add
          </button>
        )}

        <button
          onClick={handleExportCSV}
          className="bg-green-500 px-3 py-1 rounded ml-auto"
        >
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date{" "}
                {sortConfig.key === "date"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount{" "}
                {sortConfig.key === "amount"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="p-2">Category</th>
              <th className="p-2">Type</th>
              {role === "admin" && <th className="p-2">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {/* NEW ROW */}
            {newRow && (
              <tr className="bg-gray-700">
                <td className="p-2">
                  <input
                    type="date"
                    value={newRow.date}
                    onChange={(e) =>
                      setNewRow({ ...newRow, date: e.target.value })
                    }
                    className="bg-gray-800 p-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={newRow.amount}
                    onChange={(e) =>
                      setNewRow({ ...newRow, amount: e.target.value })
                    }
                    className="bg-gray-800 p-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={newRow.category}
                    onChange={(e) =>
                      setNewRow({ ...newRow, category: e.target.value })
                    }
                    className="bg-gray-800 p-1 rounded"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={newRow.type}
                    onChange={(e) =>
                      setNewRow({ ...newRow, type: e.target.value })
                    }
                    className="bg-gray-800 p-1 rounded"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={handleAdd}
                    className="bg-green-500 px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </td>
              </tr>
            )}

            {/* DATA ROWS */}
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t, index) => (
                <tr key={index} className="border-b border-gray-700">
                  {/* EDIT MODE */}
                  {editIndex === index ? (
                    <>
                      <td className="p-2">
                        <input
                          type="date"
                          value={t.date}
                          onChange={(e) => {
                            const updated = [...transactions];
                            updated[index].date = e.target.value;
                            setTransactions(updated);
                          }}
                          className="bg-gray-700 p-1"
                        />
                      </td>

                      <td className="p-2">
                        <input
                          type="number"
                          value={t.amount}
                          onChange={(e) => {
                            const updated = [...transactions];
                            updated[index].amount = e.target.value;
                            setTransactions(updated);
                          }}
                          className="bg-gray-700 p-1"
                        />
                      </td>

                      <td className="p-2">
                        <input
                          value={t.category}
                          onChange={(e) => {
                            const updated = [...transactions];
                            updated[index].category = e.target.value;
                            setTransactions(updated);
                          }}
                          className="bg-gray-700 p-1"
                        />
                      </td>

                      <td className="p-2">
                        <select
                          value={t.type}
                          onChange={(e) => {
                            const updated = [...transactions];
                            updated[index].type = e.target.value;
                            setTransactions(updated);
                          }}
                          className="bg-gray-700 p-1"
                        >
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </select>
                      </td>

                      <td className="p-2">
                        <button
                          onClick={() => setEditIndex(null)}
                          className="bg-green-500 px-2 py-1 rounded"
                        >
                          Done
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">₹{t.amount}</td>
                      <td className="p-2">{t.category}</td>
                      <td className="p-2">{t.type}</td>

                      {role === "admin" && (
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => setEditIndex(index)}
                            className="bg-yellow-500 px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
