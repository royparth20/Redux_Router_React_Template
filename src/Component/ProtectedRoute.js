import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuthState } from "../store/auth";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector(getAuthState);
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) history.push("/login");
  }, [history, isAuth]);

  return children;
};

export default ProtectedRoute;
