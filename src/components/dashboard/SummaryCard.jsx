import { motion } from "framer-motion";

export default function SummaryCard({ title, amount, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 p-5 rounded-xl shadow-md hover:scale-105 transition"
    >
      <h3 className="text-gray-400 text-xl font-bold">{title}</h3>

      <p className={`text-2xl font-bold mt-2 ${color}`}>₹{amount}</p>
    </motion.div>
  );
}
