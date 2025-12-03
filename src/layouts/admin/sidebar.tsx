import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts";
import { ADMIN_URL, AUTH_URL } from "../../constant/url";
import {
  UserIcon,
  DocumentIcon,
  ClipboardListIcon,
  CheckCircleIcon,
  LogoutIcon,
} from "../../components/icons";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar = () => {
  const { isOfficer, logout } = useAuthContext();
  const navigate = useNavigate();

  const userNavItems: NavItem[] = [
    {
      label: "My Profile",
      path: ADMIN_URL.PROFILE,
      icon: <UserIcon />,
    },
    {
      label: "My Submissions",
      path: ADMIN_URL.RESULTS,
      icon: <DocumentIcon />,
    },
  ];

  const officerNavItems: NavItem[] = [
    {
      label: "Submit Review",
      path: ADMIN_URL.SUBMISSIONS,
      icon: <ClipboardListIcon />,
    },
  ];

  const navItems = isOfficer ? officerNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate(AUTH_URL.LOGIN);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 pt-16">
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogoutIcon className="mr-3 w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

