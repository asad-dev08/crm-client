import React, { useEffect } from "react";
import { Card, Layout, Space } from "antd";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Settings from "../settings/Settings";
import Sidebar from "./Sidebar";
import { useState } from "react";
import PageHeader from "./PageHeader";
import { useMediaQuery } from 'react-responsive';


const menuList = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    children: [],
  },
  {
    id: 2,
    name: "Role Management",
    url: "",
    children: [
      {
        id: 3,
        name: "Role Groups",
        url: "",
        children: [
          {
            id: 5,
            name: "Role Group List",
            url: "/role-groups",
            children: [],
          },
          {
            id: 6,
            name: "Create Role Groups",
            url: "/role-group/new",
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: "Group Wise Menu Permission",
        url: "",
        children: [
          {
            id: 7,
            name: "Menu Permission List",
            url: "/group-menu-permissions",
            children: [],
          },
          {
            id: 8,
            name: "Create Menu Permission",
            url: "/group-menu-permission/new",
            children: [],
          },
        ],
      },
      {
        id: 9,
        name: "Users",
        url: "",
        children: [
          {
            id: 10,
            name: "Users List",
            url: "/users",
            children: [],
          },
          {
            id: 11,
            name: "Create User",
            url: "/user/new",
            children: [],
          },
        ],
      },
    ],
  },
];

const { Header, Content, Footer, Sider } = Layout;

function addKeyProperty(menuItem) {
  // Check if the item has children
  if (menuItem.children && menuItem.children.length > 0) {
    // If it has children, set the key to 'sub' + id
    menuItem.key = "sub" + menuItem.id;
    // Recursively process each child
    menuItem.children.forEach(addKeyProperty);
  } else {
    // If it doesn't have children, set the key to just the id
    menuItem.key = menuItem.id;
  }
}

const GlobalLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
useEffect(() => {
  setCollapsed(true)
}, [isMediumScreen])

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  menuList.forEach(addKeyProperty);
  console.log(menuList);
  return (
    <Layout style={{ minHeight: "100vh", borderRadius: 0, height: "100vh" }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        trigger={null}
      >
        <Sidebar
          defaultOpenKeys={[]}
          collapsed={collapsed}
          menuItems={menuList}
        />
      </Sider>
      <Layout style={{ padding: "10px" }}>
        <Space direction="vertical">
          <Card
            bodyStyle={{ padding: "12px 12px 12px 0px" }}
            style={{ padding: "0" }}
          >
            <PageHeader toggleSider={toggleSider} collapsed={collapsed} />
          </Card>
          <Card>
            <Outlet />
          </Card>
        </Space>
      </Layout>
      <Toaster />
      <Settings />
    </Layout>
  );
};

export default GlobalLayout;
