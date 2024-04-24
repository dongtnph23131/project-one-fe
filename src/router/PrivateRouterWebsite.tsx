import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteWebsite = (props: any) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")!));
  return user ? props.children : <Navigate to="/signin" />;
};
export default PrivateRouteWebsite;
