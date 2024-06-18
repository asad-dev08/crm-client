import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";
import { secureLocalStorage } from "./EncryptDecryptJWTToken";

import jwtService from "../jwtService";

export class Util {
  static instance;
  // Common Base64 encoding/decoding tool
  appEncoder = Base64;

  // Common AES encryption/decryption tool
  appEncryptor = CryptoJS.AES;
  uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };
  static getInstance() {
    if (!Util.instance) {
      Util.instance = new Util();
    }

    return Util.instance;
  }

  getUserData = () => {
    return secureLocalStorage.getItem("user_data");
  };

  invalidUser = () => {
    const hasUser = this.getUserData();
    if (hasUser === null || hasUser === "") return true;
    return false;
  };

  hasException = function (res) {
    if (res.response && res.response.data && res.response.data.httpStatus) {
      switch (res.response.data.httpStatus) {
        case "UNAUTHORIZED":
          jwtService.logout();
          window.location.href = "/";
          return true;
        case "APP_ERROR":
        case "BAD_REQUEST":
        case "NOT_FOUND":
        case "NO_CONTENT":
        case "INTERNAL_ERROR":
        case "CONNECT_ERROR":
        case "FAILURE":
        case "SERVICE_UNAVAILABLE":
        case "CONNECT_TIMEOUT":
        case "VALIDATION":
          return true;
        default:
          return false;
      }
    }
    return false;
  };
}
