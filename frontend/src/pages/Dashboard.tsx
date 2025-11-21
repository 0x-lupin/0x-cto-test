import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { UsersIcon, TicketIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [employeesByDept, setEmployeesByDept] = useState<any[]>([]);
  const [attendanceTrends, setAttendanceTrends] = useState<any[]>([]);
  const [ticketStats, setTicketStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, empDeptRes, attendanceRes, ticketsRes] = await Promise.all([
        api.get('/analytics/dashboard'),
        api.get('/analytics/employees/department'),
        api.get('/analytics/attendance/trends'),
        api.get('/analytics/tickets/stats'),
      ]);

      setStats(statsRes.data);
      setEmployeesByDept(empDeptRes.data);
      setAttendanceTrends(attendanceRes.data);
      setTicketStats(ticketsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  const statCards = [
    {
      name: 'Total Employees',
      value: stats?.employees?.total || 0,
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Open Tickets',
      value: stats?.tickets?.open || 0,
      icon: TicketIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Budget Spent',
      value: `$${(stats?.budget?.spent || 0).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Today Attendance',
      value: stats?.attendance?.today || 0,
      icon: ClockIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="overflow-hidden bg-white rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Employees by Department
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeesByDept}
                dataKey="count"
                nameKey="department"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {employeesByDept.map((entry, index) => (
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
            Ticket Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketStats?.byStatus || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Attendance Trends (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="PRESENT" stroke="#10b981" />
            <Line type="monotone" dataKey="ABSENT" stroke="#ef4444" />
            <Line type="monotone" dataKey="LATE" stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
