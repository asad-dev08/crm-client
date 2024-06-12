import React from "react";
import { getGeneratedCode } from "./codegen";

const Preview = ({ data }) => {
  return <div>{data && data.length > 0 && data.map(getGeneratedCode)}</div>;
};

export default Preview;
