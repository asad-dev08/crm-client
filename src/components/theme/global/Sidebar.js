import React, { useEffect, useState } from "react";
import { Menu, Layout, Card, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
const { SubMenu } = Menu;
const { Title } = Typography;
const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    icon: MdDashboard,
    children: [],
  },
  {
    id: 2,
    name: "Role Management",
    url: "",
    children: [
      {
        id: 3,
        name: "Security Rule",
        url: "",
        children: [
          {
            id: 5,
            name: "Security Rule List",
            url: "/security-rules",
            children: [],
          },
          {
            id: 6,
            name: "Create Security Rules",
            url: "/security-rule/new",
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: "Security Group",
        url: "",
        children: [
          {
            id: 7,
            name: "Security Group List",
            url: "/security-groups",
            children: [],
          },
          {
            id: 8,
            name: "Create Security Group",
            url: "/security-group/new",
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
function addKeyProperty(menuItem) {
  if (menuItem.children && menuItem.children.length > 0) {
    menuItem.key = menuItem.id;
    menuItem.children.forEach(addKeyProperty);
  } else {
    menuItem.key = menuItem.id;
  }
}
menuItems.forEach(addKeyProperty);

function getItem(label, url, key, children, type) {
  return {
    key,
    children,
    label,
    url,
    type,
  };
}
const convertMenuItem = (menuItem) => {
  const { id, name, url, children } = menuItem;
  const key = id.toString();
  const childrenItems =
    children.length > 0 ? children.flatMap(convertMenuItem) : undefined;
  return getItem(name, url, key, childrenItems);
};
const items = menuItems.flatMap(convertMenuItem);

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const Sidebar = ({ defaultOpenKeys, collapsed, isMediumScreen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  const findMenuItem = (items, key) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const child = findMenuItem(item.children, key);
        if (child) {
          return child;
        }
      }
    }
    return null;
  };
  const handleClick = (info) => {
    const { key } = info;
    const menuItem = findMenuItem(items, key);
    if (menuItem && menuItem.url) {
      navigate(menuItem.url);
    }
  };

  return (
    <div
    //   className="fixed bottom-0 left-0 top-0 flex flex-col"
    >
      <Card
        style={{ borderRadius: 0, width: 250, height: 80 }}
        bodyStyle={{
          padding: "",
        }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>
          CRM
        </Title>
      </Card>
      <Menu
        style={{
          height: !isMediumScreen ? "calc(100vh - 80px)" : "",
          overflowY: "auto",
          width: "250px",
          padding: "0 5px",
          fontSize: 13,
          fontWeight: 500,
        }}
        mode="inline"
        onClick={handleClick}
        defaultSelectedKeys={[]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </div>
  );
};
export default Sidebar;
