import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import JwtService from "../jwtService";
import { secureLocalStorage } from "../util/EncryptDecryptJWTToken";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setIsAuthentication,
  verifyToken,
} from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import jwtService from "../jwtService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  //   useEffect(() => {
  //     JwtService.init();
  //   }, [dispatch]);

  useEffect(() => {
    JwtService.init();
    const handleAuth = async () => {
      const storedToken = secureLocalStorage.getItem("access_token");
      if (storedToken) {
        const isTokenExpired = checkTokenExpiration(storedToken);
        if (isTokenExpired) {
          await dispatch(logout());
        } else {
          await dispatch(verifyToken());
          await dispatch(setIsAuthentication(true));
        }
      } else {
        dispatch(logout());
      }
    };
    handleAuth();
  }, [token]);

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

  const contextValue = useMemo(
    () => ({
      token,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
