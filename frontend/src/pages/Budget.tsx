import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Budget = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [utilization, setUtilization] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
    fetchUtilization();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await api.get('/budgets');
      setBudgets(response.data);
    } catch (error) {
      toast.error('Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  const fetchUtilization = async () => {
    try {
      const response = await api.get('/analytics/budget/utilization');
      setUtilization(response.data);
    } catch (error) {
      console.error('Failed to fetch budget utilization');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Budget Utilization by Department
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={utilization}
                dataKey="spent"
                nameKey="department"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {utilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Department Budget Summary
          </h2>
          <div className="space-y-4">
            {utilization.map((item) => (
              <div key={item.department} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-900">{item.department}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Allocated: ${item.allocated.toLocaleString()}</p>
                  <p>Spent: ${item.spent.toLocaleString()}</p>
                  <p>Remaining: ${item.remaining.toLocaleString()}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(item.utilization, 100)}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs">{item.utilization.toFixed(1)}% utilized</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Department
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Year
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Quarter
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Allocated
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Spent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {budget.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {budget.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {budget.year}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  Q{budget.quarter}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${budget.allocated.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${budget.spent.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
