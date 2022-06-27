import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export default function ProtectedRoute({outlet}: ProtectedRouteProps) {
  const {currentUser} = useContext(AuthContext);
  if(currentUser) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
};
