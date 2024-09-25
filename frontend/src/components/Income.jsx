import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { INCOME_API_ENDPOINT } from "../utils/constant";

const IncomeManager = () => {
  const [monthlyIncome, setMonthlyIncome] = useState({});
  const [lockedMonths, setLockedMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  useEffect(() => {
    // Fetch existing incomes from the backend
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get("/api/income"); // Adjust the endpoint as needed
        const data = response.data;
        const incomeData = {};
        const locked = [];
        data.forEach((item) => {
          incomeData[item.month] = item.amount;
          if (item.isLocked) {
            locked.push(item.month);
          }
        });
        setMonthlyIncome(incomeData);
        setLockedMonths(locked);
      } catch (error) {
        console.error("Failed to fetch income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMonth || !incomeAmount) {
      toast.error("Please fill in both the month and the income amount.");
      return;
    }

    try {
      const response = await axios.post(`${INCOME_API_ENDPOINT}/`, {
        month: selectedMonth,
        amount: incomeAmount,
        isLocked: false, // Set to false when adding new income
      });

      if (response.data.success) {
        setMonthlyIncome({
          ...monthlyIncome,
          [selectedMonth]: incomeAmount,
        });
        toast.success("Income added successfully!");
        setSelectedMonth("");
        setIncomeAmount("");
      }
    } catch (error) {
      toast.error("Failed to add income. Try again later.");
      console.error(error);
    }
  };

  const lockMonth = async (month) => {
    try {
      const response = await axios.put(`/api/income/${month}/lock`); // Adjust the endpoint as needed
      if (response.data.success) {
        setLockedMonths([...lockedMonths, month]);
        toast.success(`${month} income locked!`);
      }
    } catch (error) {
      toast.error("Failed to lock income. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Monthly Income Management</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Select Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a month</option>
            {months.map((month) => (
              <option
                key={month}
                value={month}
                disabled={lockedMonths.includes(month)}
              >
                {month} {lockedMonths.includes(month) && "(Locked)"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Income Amount
          </label>
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter income amount"
            disabled={lockedMonths.includes(selectedMonth)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          disabled={lockedMonths.includes(selectedMonth)}
        >
          Submit Income
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6">Locked Months</h2>
      <ul className="mt-4">
        {lockedMonths.map((month) => (
          <li key={month} className="border p-2 rounded mt-2 bg-gray-200">
            {month}
            <button
              onClick={() => lockMonth(month)}
              className="ml-4 text-red-600 hover:underline"
              disabled
            >
              Locked
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-6">Current Income Entries</h2>
      <ul className="mt-4">
        {Object.entries(monthlyIncome).map(([month, amount]) => (
          <li key={month} className="border p-2 rounded mt-2">
            {month}: ${amount}
            {!lockedMonths.includes(month) && (
              <button
                onClick={() => lockMonth(month)}
                className="ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
              >
                Lock Income
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeManager;
