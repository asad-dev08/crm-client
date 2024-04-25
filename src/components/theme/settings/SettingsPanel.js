import { Button, Drawer, Flex, Space } from "antd";
import React, { useState } from "react";
import { themes } from "../ThemeProvider";
import { useDispatch } from "react-redux";
import { setCurrentTheme } from "../../../redux/theme/themeSlice";

const SettingsPanel = ({ placement, onClose, open }) => {
  const dispatch = useDispatch();
  const changeTheme = (sTheme) => {
    dispatch(setCurrentTheme(themes[sTheme]));
  };
  return (
    <Drawer
      title="Theme Settings"
      placement={placement}
      width={500}
      onClose={onClose}
      open={open}
    >
      <Space>
        <Flex wrap="wrap" gap="small">
          <Button onClick={() => changeTheme("default_light")}>
            Light (Default)
          </Button>
          <Button onClick={() => changeTheme("default_dark")}>
            Dark (Default)
          </Button>
          <Button onClick={() => changeTheme("classic_blue_torquoise_gold")}>
            Dark (Blue, Torquoise, Gold)
          </Button>
          <Button onClick={() => changeTheme("blue_beige_coral")}>
            Dark (Blue, Beighe, Coral)
          </Button>
          <Button onClick={() => changeTheme("teal_white")}>
            Light (White, Teal)
          </Button>
          <Button onClick={() => changeTheme("white_purple_orange")}>
            Light (White, Purple, Orange)
          </Button>
        </Flex>
      </Space>
    </Drawer>
  );
};

export default SettingsPanel;
