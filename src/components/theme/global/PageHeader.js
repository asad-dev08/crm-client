import { Avatar, Button, Divider, Dropdown, Menu } from "antd";
import React from "react";

import { MdPerson } from "react-icons/md";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const PageHeader = ({ toggleSider, collapsed, isMediumScreen, showDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const handleLogoutFromApp = async (e) => {
    e.preventDefault();
    await dispatch(handleLogout());
    //navigate("/login", { replace: true });
  };

  const menu = (
    <Menu style={{ width: "110px", textAlign: "left" }}>
      <Menu.Item>
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item>
        <span>Settings</span>
      </Menu.Item>
      <Divider plain style={{ margin: "2px 0" }} />

      <Menu.Item
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          className="w-full"
          type="primary"
          danger
          onClick={(e) => handleLogoutFromApp(e)}
        >
          Sign Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className=" w-full h-full flex items-center justify-between">
      <Button
        type="text"
        className="ml-3 rounded-full h-10 w-10 flex items-center justify-center"
        onClick={!isMediumScreen ? toggleSider : showDrawer}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>

      <Dropdown overlay={menu}>
        <Avatar
          className="hover:cursor-pointer"
          icon={<MdPerson />}
          size="large"
        />
      </Dropdown>
    </div>
  );
};

export default PageHeader;
