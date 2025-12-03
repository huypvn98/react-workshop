import { Navigate } from "react-router";
import { useAuthContext } from "../contexts";
import { AUTH_URL, ADMIN_URL } from "../constant/url";

const AuthRedirect = () => {
  const { isAuthenticated, isOfficer, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={AUTH_URL.LOGIN} replace />;
  }

  if (isOfficer) {
    return <Navigate to={ADMIN_URL.SUBMISSIONS} replace />;
  }

  return <Navigate to={ADMIN_URL.PROFILE} replace />;
};

export default AuthRedirect;
