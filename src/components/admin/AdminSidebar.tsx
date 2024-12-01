import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Flag,
  Users,
  Settings
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: MessageSquare, label: 'Posts', path: '/admin/posts' },
  { icon: Flag, label: 'Reports', path: '/admin/reports' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}