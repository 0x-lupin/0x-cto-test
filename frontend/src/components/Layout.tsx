import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Employees', href: '/employees', icon: UsersIcon },
    { name: 'Attendance', href: '/attendance', icon: ClockIcon },
    { name: 'Leaves', href: '/leaves', icon: CalendarIcon },
    { name: 'Payroll', href: '/payroll', icon: CurrencyDollarIcon },
    { name: 'Tickets', href: '/tickets', icon: TicketIcon },
    { name: 'Budget', href: '/budget', icon: ChartBarIcon },
    { name: 'Content', href: '/content', icon: DocumentTextIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-2xl font-bold text-primary-600">EMS</h1>
              </div>
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                  >
                    <item.icon
                      className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
              <div className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs font-medium text-gray-500">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Enterprise Management System
              </h2>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </header>

          <main className="relative flex-1 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
