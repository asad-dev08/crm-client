import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logout,
  setIsAuthentication,
  verifyToken,
} from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { secureLocalStorage } from "../util/EncryptDecryptJWTToken";
import jwtService from "../jwtService";
import toast from "react-hot-toast";

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
    const handleAuth = async () => {
      const storedToken = secureLocalStorage.getItem("access_token");

      if (storedToken) {
        const isTokenExpired = checkTokenExpiration(storedToken);
        if (isTokenExpired) {
          await dispatch(logout());
          navigate("/login", { replace: true });
        } else {
          await dispatch(verifyToken());
          await dispatch(setIsAuthentication(true));
        }
      } else {
        dispatch(logout());
        navigate("/login", { replace: true });
      }
    };
    handleAuth();
  }, [dispatch]);

  const checkTokenExpiration = (token) => {
    // Implement token expiration check logic
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
        const firstMenu =
          (res.payload.menus &&
            res.payload.menus.length > 0 &&
            res.payload.menus[0].url) ||
          undefined;
        toast.success("Logged in", { duration: 4000 });
        if (firstMenu) navigate(firstMenu, { replace: true });
        else navigate("/error", { replace: true });
      }
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      handleLogin,
    }),
    [user, handleLogin]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
