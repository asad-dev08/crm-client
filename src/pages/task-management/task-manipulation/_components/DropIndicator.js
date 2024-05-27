import React from "react";

const DropIndicator = ({ beforeId, column, taskCount }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-2 w-full bg-indigo-600 opacity-0"
    />
  );
};

export default DropIndicator;
