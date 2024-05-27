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
import { useDispatch } from "react-redux";
import {
  deleteTask,
  getTaskByBoard,
} from "../../../../redux/task-management/taskManagementSlice.js";
import toast from "react-hot-toast";
import AddTask from "./AddTask.js";

export const TaskCard = ({
  title,
  id,
  column_name,
  handleDragStart,
  className,
  icon,
  description,
  is_active,
  username,
  target_date,
  taskCount,
  board_id,
  columns,
  user_id,
  column_id,
  task_users,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const showDeleteModal = (e, id) => {
    setDeleteModalVisible(true);
  };
  const handleDeleteModalOk = async () => {
    dispatch(deleteTask({ id: id, board_id: board_id })).then(() => {
      toast.success("Task deleted", { duration: 3000 });
      dispatch(getTaskByBoard({ board_id: board_id }));
    });
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
      setIsEdit(true);
      setIsView(false);
    } else if (e.key === "view") {
      handleView();
    }
  };
  const handleModalClose = () => {
    setIsEdit(false);
  };
  const handleAdd = () => {
    dispatch(getTaskByBoard({ board_id: board_id }));
  };
  const handleView = () => {
    setIsView(true);
    setIsEdit(true);
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column_name} taskCount={taskCount} />
      <motion.div>
        <Card
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { title, id, column_name })}
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

      {isEdit && (
        <AddTask
          isOpen={isEdit}
          handleModalClose={handleModalClose}
          isAdd={false}
          isView={isView}
          handleAdd={handleAdd}
          data={{
            title,
            id,
            column_name,
            column: column_id,
            handleDragStart,
            className,
            icon,
            description,
            user_id,
            is_active,
            username,
            target_date,
            taskCount,
            board_id,
          }}
          board_id={board_id}
          task_users={task_users}
          columns={
            columns.length > 0 &&
            columns.map((col) => {
              return { label: col.column_name, value: col.id };
            })
          }
        />
      )}
    </>
  );
};
