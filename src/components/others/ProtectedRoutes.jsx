import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import Loading from "./Loading";

const ProtectedRoutes = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return <Loading/>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoutes;