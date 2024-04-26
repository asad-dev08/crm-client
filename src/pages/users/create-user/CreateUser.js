import { Button, Drawer, Form, Space } from "antd";
import React from "react";

const defaultForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  full_name: "",
  is_active: true,
  phone: "",
  address: "",
  isPasswordReset: false,
};

const CreateUser = ({ onClose, open, data }) => {
  return (
    <Drawer
      title="Add/Edit User"
      placement="right"
      width={600}
      onClose={onClose}
      open={open}
      maskClosable={false}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    ></Drawer>
  );
};

export default CreateUser;
