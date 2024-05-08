import React from "react";
import { Button, Typography } from "antd";
import { MdAdd } from "react-icons/md";

const { Title } = Typography;

const SecurityRuleListHeader = ({ showDrawer, setIsAdd }) => {
  const handleClick = (e) => {
    e.preventDefault();
    showDrawer();
    setIsAdd(true);
  };
  return (
    <div className="w-full flex items-center justify-between mb-5">
      <Title level={5}>Security Rule List</Title>
      <div className="flex items-center flex-col lg:flex-row">
        <Button
          type="primary"
          icon={<MdAdd />}
          className="flex items-center"
          onClick={handleClick}
        >
          Add Security Rule
        </Button>
      </div>
    </div>
  );
};

export default SecurityRuleListHeader;
