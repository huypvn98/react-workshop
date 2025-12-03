import { useAuthContext } from "../../contexts";
import { SearchIcon, BellIcon, GridIcon, MoonIcon } from "../../components/icons";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <a href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Simple KYC</span>
          </a>
        </div>

        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <BellIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <GridIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <MoonIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
            <img
              src={user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

