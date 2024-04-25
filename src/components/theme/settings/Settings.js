import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import SettingsPanel from "./SettingsPanel";

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
      <div
        className="h-[30px] w-[30px] rounded-full shadow-lg fixed right-5 bottom-5 bg-blue-200 flex items-center justify-center hover:cursor-pointer"
        onClick={showDrawer}
      >
        <AiOutlineSetting />
      </div>

      {open && (
        <SettingsPanel placement="right" onClose={onClose} open={open} />
      )}
    </>
  );
};

export default Settings;
