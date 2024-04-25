import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const themes = {
  blue: {
      colorPrimary: "#1890ff",
      colorInfo: "#52c41a",
    },
};

const ThemeProvider = ({ children }) => {
  const [primary, setPrimary] = React.useState("#FFFFFF");
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  console.log(currentTheme)

//   useEffect(() => {
//     const { colorPrimary } = themes[currentTheme];
//   console.log(colorPrimary);
//     setPrimary(colorPrimary)    
//   }, [currentTheme])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: currentTheme.colorPrimary,
          fontFamily: `"Inter", sans-serif`,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
