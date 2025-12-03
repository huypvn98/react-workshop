import { Navigate } from "react-router";
import { useAuthContext } from "../../contexts";
import { ADMIN_URL } from "../../constant/url";

const Dashboard = () => {
  const { isOfficer } = useAuthContext();

  if (isOfficer) {
    return <Navigate to={ADMIN_URL.SUBMISSIONS} replace />;
  }

  return <Navigate to={ADMIN_URL.PROFILE} replace />;
};

export default Dashboard;
