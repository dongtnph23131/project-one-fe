import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteWebsite = ({ user }: any) => {
  return user ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateRouteWebsite;
