import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

PublicRoute.propTypes = {
  children: PropTypes.node,
};

export default PublicRoute;
