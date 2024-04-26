import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logout,
  setIsAuthentication,
} from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { secureLocalStorage } from "../util/EncryptDecryptJWTToken";
import jwtService from "../jwtService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    jwtService.init();
    // Check token expiration on mount
    const storedToken = secureLocalStorage.getItem("access_token");

    if (storedToken) {
      const isTokenExpired = checkTokenExpiration(storedToken);
      if (isTokenExpired) {
        dispatch(logout());
        navigate("/login", { replace: true });
      } else {
        dispatch(setIsAuthentication(true));
      }
    } else {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [dispatch]);

  const checkTokenExpiration = (token) => {
    // Implement token expiration check logic
    // You can use a library like jwt-decode to decode the token and get the expiration time
    // Example: https://www.npmjs.com/package/jwt-decode
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      console.warn("access token expired");
      jwtService.setUserData(null);
      jwtService.setSession(null);
      return true;
    }
    return false;
  };

  // call this function when you want to authenticate the user
  const handleLogin = async (data) => {
    await dispatch(loginUser(data)).then((res) => {
      if (res && res.payload && res.payload.user) {
        navigate("/dashboard", { replace: true });
      }
    });
  };

  // call this function to sign out logged in user
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      handleLogin,
      handleLogout,
    }),
    [user, handleLogin, handleLogout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
