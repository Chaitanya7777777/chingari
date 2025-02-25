import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function TradingBotUI() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const executeTrade = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/execute_trade", {
        trader_wallet: wallet,
        amount,
      });
      toast.success(`Trade Executed: ${response.data.amount} ETH`);
    } catch (error) {
      toast.error("Trade Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-md p-6 shadow-lg rounded-2xl bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">AI Trading Bot</h2>
          <input
            type="text"
            placeholder="Enter Trader Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="number"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={executeTrade}
            disabled={loading}
          >
            {loading ? "Processing..." : "Execute Trade"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
