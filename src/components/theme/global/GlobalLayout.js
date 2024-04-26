import React, { useEffect } from "react";
import { Card, Drawer, Layout, Space } from "antd";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Settings from "../settings/Settings";
import Sidebar from "./Sidebar";
import { useState } from "react";
import PageHeader from "./PageHeader";
import { useMediaQuery } from "react-responsive";
import { MdDashboard } from "react-icons/md";

const { Header, Content, Footer, Sider } = Layout;

const GlobalLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const isMediumScreen = useMediaQuery({ maxWidth: 991 });

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCollapsed(isMediumScreen);
  }, [isMediumScreen]);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(isMediumScreen);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMediumScreen]);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh", borderRadius: 0, height: "100%" }}>
      {isMediumScreen ? (
        <Drawer
          style={{ width: 250, height: "calc(100vh)" }}
          bodyStyle={{ padding: 0, overflowX: "hidden", overflowY: "auto" }}
          headerStyle={{ padding: 5 }}
          placement={placement}
          width={250}
          onClose={onClose}
          open={open}
        >
          <Sidebar
            defaultOpenKeys={[]}
            collapsed={collapsed}
            isMediumScreen={isMediumScreen}
          />
        </Drawer>
      ) : (
        <Sider
          className="fixed bottom-0 left-0 top-0"
          width={250}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          trigger={null}
        >
          <Sidebar
            defaultOpenKeys={[]}
            collapsed={collapsed}
            isMediumScreen={isMediumScreen}
          />
        </Sider>
      )}

      <Layout style={{ padding: "10px" }}>
        <Space direction="vertical">
          <Card
            bodyStyle={{ padding: "12px 12px 12px 0px" }}
            style={{ padding: "0" }}
          >
            <PageHeader
              toggleSider={toggleSider}
              collapsed={collapsed}
              isMediumScreen={isMediumScreen}
              showDrawer={showDrawer}
            />
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
