import { useState } from "react";
import { Navigate } from "react-router";

const PrivateRoute = (props: any) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")!));
  if (user.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return user ? props.children : <Navigate to="/signin" />;
};

export default PrivateRoute;
