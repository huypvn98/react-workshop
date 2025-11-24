import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
