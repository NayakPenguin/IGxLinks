import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === null) return <div>Loading...</div>;
  if (user === false) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
