import { Navigate, Outlet } from "react-router-dom";

export const AppRoutesProtected = () => {
  let isLogged = localStorage.getItem("jwt");

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
