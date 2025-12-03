import { Outlet, Navigate } from "react-router";
import { useAuthContext } from "../../contexts";
import { AUTH_URL } from "../../constant/url";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

const AdminLayout = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="ml-64 pt-16 min-h-screen flex flex-col">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;
