import { jwtDecode } from "jwt-decode";
import { Util } from "../util/Util";
import { secureLocalStorage } from "../util/EncryptDecryptJWTToken";
const util = new Util();

class JwtService {
  init() {
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      return;
    }
    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
    } else {
      this.setSession(null);
      // Show error message and navigate to login page
      // You can replace the console.warn with your preferred method for showing error messages
      console.warn("Access token expired");

      // Navigate to login page
      window.location.href = "/login"; // Redirect to login page
    }
  };

  setSession = (access_token) => {
    if (access_token) {
      secureLocalStorage.setItem("access_token", access_token);
    } else {
      secureLocalStorage.removeItem("access_token");
    }
  };
  removeUserData = () => {
    secureLocalStorage.removeItem("user_data");
  };
  setUserData = (data) => {
    const obj = util.getUserData();
    if (obj !== null) {
      secureLocalStorage.removeItem("user_data");
    }
    secureLocalStorage.setItem("user_data", data);
  };
  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
    // const decodedToken = jwtDecode(token);
    // const currentTime = Date.now() / 1000;
    // if (decodedToken.exp < currentTime) {
    //   console.warn("access token expired");
    //   jwtService.setUserData(null);
    //   jwtService.setSession(null);
    //   return true;
    // }
    // return false;
  };

  getAccessToken = () => {
    return secureLocalStorage.getItem("access_token");
  };
}

const instance = new JwtService();

export default instance;
