import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { TOKEN } from "../constant/auth";
import { type User, UserRole, type AuthState } from "../types/user";

const OFFICER_USERNAMES = ["admin", "oliviaw", "liamg"];
const USER_DATA_KEY = "user_data";

type AuthContextType = AuthState & {
  login: (user: Omit<User, "role">) => void;
  logout: () => void;
  isOfficer: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

const determineRole = (username: string): UserRole => {
  return OFFICER_USERNAMES.includes(username.toLowerCase())
    ? UserRole.OFFICER
    : UserRole.USER;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER_DATA_KEY);
        setState({ ...initialState, isLoading: false });
      }
    } else {
      setState({ ...initialState, isLoading: false });
    }
  }, []);

  const login = useCallback((userData: Omit<User, "role">) => {
    const role = determineRole(userData.username);
    const user: User = { ...userData, role };

    localStorage.setItem(TOKEN, user.accessToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_DATA_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const isOfficer = state.user?.role === UserRole.OFFICER;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isOfficer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

