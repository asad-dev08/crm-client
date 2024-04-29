import { Avatar, Button, Divider, Dropdown, Menu } from "antd";
import React from "react";

import { MdChevronLeft, MdChevronRight, MdPerson } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ toggleSider, collapsed, isMediumScreen, showDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
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
        <Button className="w-full" type="primary" danger onClick={handleLogout}>
          Sign Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="flex items-center justify-between">
      <Button
        type="link"
        onClick={!isMediumScreen ? toggleSider : showDrawer}
        className="text-2xl"
      >
        {React.createElement(collapsed ? MdChevronRight : MdChevronLeft)}
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
