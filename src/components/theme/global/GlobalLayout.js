import React, { useEffect } from "react";
import { Card, Drawer, Layout, Space, Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Settings from "../settings/Settings";
import Sidebar from "./Sidebar";
import { useState } from "react";
import PageHeader from "./PageHeader";
import { useMediaQuery } from "react-responsive";

import { Util } from "../../../util/Util";
import Login from "../../../pages/login/Login";
import FullScreenLoader from "./loader/FullScreenLoader";
const util = new Util();

const { Header, Content, Footer, Sider } = Layout;

const GlobalLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const menus = useSelector((state) => state.auth.menus);
  const isMediumScreen = useMediaQuery({ maxWidth: 1023 });

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");

  useEffect(() => {
    const isinv = util.invalidUser();
    setIsInvalid(isinv);
    // Set loading state to false once authentication status is determined
    setIsLoading(false);
  }, [isAuthenticated]);

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

  // Render loading spinner while authentication status is being determined
  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Render login page if not authenticated
  if (isInvalid) {
    return <Login />;
  }

  // Render main content if authenticated
  return (
    <Layout style={{ minHeight: "100vh", borderRadius: 0, height: "100%" }}>
      {!isInvalid && (
        <div>
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
                menus={menus}
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
                menus={menus}
              />
            </Sider>
          )}
        </div>
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
