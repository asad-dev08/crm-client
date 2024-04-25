import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import SettingsPanel from "./SettingsPanel";
import { Button, Tooltip } from "antd";

const Settings = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Theme Settings" className="fixed bottom-5 right-5">
        <Button type="primary" shape="circle" icon={<AiOutlineSetting />} onClick={showDrawer} />
      </Tooltip>

      {open && (
        <SettingsPanel placement="right" onClose={onClose} open={open} />
      )}
    </>
  );
};

export default Settings;
