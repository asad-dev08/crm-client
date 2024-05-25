import React, { useState } from "react";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { cn } from "../../../../util/cn.ts";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator.js";
import {
  MdDeleteOutline,
  MdEdit,
  MdMoreVert,
  MdOutlineRemoveRedEye,
  MdTask,
} from "react-icons/md";
import moment from "moment";

export const TaskCard = ({
  title,
  id,
  column,
  handleDragStart,
  className,
  icon,
  description,
  is_active,
  username,
  target_date,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = (e, id) => {
    setDeleteModalVisible(true);
  };
  const handleDeleteModalOk = async () => {
    // Perform delete action
    // const response = await dispatch(deleteUser(selectedRow.id));
    // if (response) {
    //   toast.success("User deleted", { duration: 3000 });
    //   setDeleteStatus(true); // Trigger data refetch
    //   setDeleteModalVisible(false); // Close the modal
    // }
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false); // Close the modal
  };
  const getMenu = (id) => (
    <Menu onClick={(e) => handleMenuClick(e, id)}>
      <Menu.Item key="edit">
        <div className="flex items-center gap-2">
          <MdEdit /> Edit
        </div>
      </Menu.Item>
      <Menu.Item key="delete" onClick={(e) => showDeleteModal(e, id)}>
        <div className="flex items-center gap-2">
          <MdDeleteOutline />
          Delete
        </div>
      </Menu.Item>
      <Menu.Item key="view">
        <div className="flex items-center gap-2">
          <MdOutlineRemoveRedEye />
          View
        </div>
      </Menu.Item>
    </Menu>
  );
  const handleMenuClick = async (e, item) => {
    if (e.key === "edit") {
      //handleEdit(e, item);
      // const response = await dispatch(getUser(row.id));
      // const data =
      //   (await response) && response.payload && response.payload.data;
      // setSelectedRow(data);
      // showDrawer();
      // setIsAdd(false);
    }
  };
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div>
        <Card
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { title, id, column })}
          bodyStyle={{ padding: 0, width: "100%" }}
          className={cn(
            "w-full mb-3 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4  border border-transparent justify-between flex flex-col items-start space-y-4 cursor-grab relative",
            className
          )}
        >
          <div className="group-hover/bento:translate-x-1 transition duration-200 text-left flex flex-col gap-2 relative">
            <div className="w-full flex items-center justify-between z-10">
              <MdTask />
              <Dropdown
                overlay={getMenu(id)}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button
                  onClick={(e) => e.stopPropagation()}
                  icon={<MdMoreVert />}
                />
              </Dropdown>
            </div>

            <div className="font-semibold text-xs  mb-2 mt-2 line-clamp-2">
              {title}
            </div>
            <div className="font-normal text-xs text-slate-700  line-clamp-3">
              {description}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-slate-500">
                Assigned to: {username}
              </label>
              <label className="font-semibold text-xs text-slate-500">
                Target date:{" "}
                {moment(target_date).format("YYYY-MM-DD HH:mm:ss A")}
              </label>
              <label
                className={`text-xs max-w-min text-nowrap px-2 py-1 rounded-lg ${
                  is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {is_active ? "Active task" : "Inactive task"}
              </label>
            </div>
          </div>
        </Card>
        <Modal
          className="z-[9999]"
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={handleDeleteModalOk}
          onCancel={handleDeleteModalCancel}
          maskClosable={false}
        >
          <p>Are you sure you want to delete this task?</p>
        </Modal>
      </motion.div>
    </>
  );
};
