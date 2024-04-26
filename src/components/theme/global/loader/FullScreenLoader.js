import { Spin } from "antd";
import React from "react";

const FullScreenLoader = ({ isLoading }) => {
  return (
    <div className="full-screen-spin-loader">
      <Spin size="large" />
    </div>
  );
};

export default FullScreenLoader;
