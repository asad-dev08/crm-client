import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const themes = {
  default_light: {
    colorBgBase: "#ffffff",
    colorPrimary: "#4f46e5",
    colorInfo: "#4f46e5",
    colorLink: "#ea580c",
    colorTextBase: "#000000",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
  },
  default_dark: {
    colorBgBase: "#0f172a",
    colorPrimary: "#4f46e5",
    colorInfo: "#4f46e5",
    colorLink: "#ea580c",
    colorTextBase: "#ffffff",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
    colorBgLayout: "#020617",
  },
  classic_blue_torquoise_gold: {
    colorBgBase: "#0a1828",
    colorPrimary: "#178582",
    colorInfo: "#178582",
    colorLink: "#bfa181",
    colorTextBase: "#ffffff",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
  },
  blue_beige_coral: {
    colorBgBase: "#001233",
    colorPrimary: "#ff595a",
    colorInfo: "#ff595a",
    colorLink: "#cac0b3",
    colorTextBase: "#ffffff",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
  },
  teal_white: {
    colorBgBase: "#ffffff",
    colorPrimary: "#6acfc7",
    colorInfo: "#6acfc7",
    colorLink: "#0c1a1a",
    colorTextBase: "#000000",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
  },
  white_purple_orange: {
    colorBgBase: "#ffffff",
    colorPrimary: "#c53678",
    colorInfo: "#c53678",
    colorLink: "#ff5841",
    colorTextBase: "#000000",
    colorSuccess: "#16a34a",
    colorWarning: "#ca8a04",
    colorError: "#dc2626",
  },
};
function hexToRGBA(hex, opacity) {
  // Remove the leading # if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Ensure opacity is within the range of 0 to 1
  opacity = Math.min(1, Math.max(0, opacity));

  // Return the RGBA color string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const ThemeProvider = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: currentTheme.colorBgBase,
          colorPrimary: currentTheme.colorPrimary,
          colorInfo: currentTheme.colorInfo,
          colorLink: currentTheme.colorLink,
          colorTextBase: currentTheme.colorTextBase,
          colorSuccess: currentTheme.colorSuccess,
          colorWarning: currentTheme.colorWarning,
          colorError: currentTheme.colorError,
          fontFamily: `"Inter", sans-serif`,
          Button: {
            primaryShadow: "none !important",
          },
          Menu: {
            // colorItemBgHover: "red",
            colorItemBgSelected: hexToRGBA(currentTheme.colorPrimary, 0.1),
            colorItemTextSelected: currentTheme.colorPrimary,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
