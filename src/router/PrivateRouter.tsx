import { Navigate } from "react-router";
const PrivateRoute = (props: any) => {
  if (props.user.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return props.user ? props.children : <Navigate to="/signin" />;
};

export default PrivateRoute;
