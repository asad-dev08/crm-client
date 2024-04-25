import React, { useEffect, useState } from "react";
import { Menu, Layout, Card, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { SubMenu } = Menu;
const { Title } = Typography;

const findKeyByUrl = (menuItems, url, prefix = "") => {
  for (const item of menuItems) {
    const itemKey = prefix + item.id;
    console.log(item.url + ":" + url);
    if (item.url === url) {
      return itemKey;
    }
    if (item.children && item.children.length > 0) {
      const keyInChild = findKeyByUrl(item.children, url, "sub" + item.id);
      if (keyInChild) {
        return keyInChild;
      }
    }
  }
  return null;
};

const Sidebar = ({ menuItems, defaultOpenKeys, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState([]);
  const rootKeys = [""];
  const selectedKey = findKeyByUrl(menuItems, location.pathname);

  useEffect(() => {
    if (!collapsed) {
      setOpenKeys(defaultOpenKeys);
    }
  }, [defaultOpenKeys, collapsed]);

  // Open only one submenu at a time
  const onOpenChange = (items) => {
    const latestOpenKey = items.find((key) => openKeys.indexOf(key) === -1);
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(items);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : defaultOpenKeys);
    }
  };

  const handleClick = (url) => {
    if (url !== "") {
      navigate(url, { replace: true });
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      const subMenuTitle = <span>{item.name}</span>;
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.key} title={subMenuTitle}  style={{fontSize: 12, fontWeight:600}}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} onClick={(e) => handleClick(item.url)} style={{fontSize: 12, fontWeight:600}}>
            {item.name}
          </Menu.Item>
        );
      }
    });
  };

  return (
    <>
      <Card
        style={{ borderRadius: 0 }}
        bodyStyle={{
          padding: "",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>
          CRM
        </Title>
      </Card>
      <Menu
        style={{ height: "100vh", overflowY: "auto" }}
        mode="inline"
        openKeys={openKeys}
        defaultSelectedKeys={[selectedKey]}
        onOpenChange={onOpenChange}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </>
  );
};
export default Sidebar;
