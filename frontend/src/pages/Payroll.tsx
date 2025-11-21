import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await api.get('/payroll');
      setPayrolls(response.data);
    } catch (error) {
      toast.error('Failed to fetch payroll');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Employee
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Period
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Base Salary
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Allowances
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Deductions
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Net Salary
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {payroll.employee.user.firstName} {payroll.employee.user.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {payroll.month}/{payroll.year}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${payroll.baseSalary.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${payroll.allowances.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${payroll.deductions.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                  ${payroll.netSalary.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    payroll.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payroll.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
