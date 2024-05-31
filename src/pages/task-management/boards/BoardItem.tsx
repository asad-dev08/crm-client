import React, { useState } from "react";
import { cn } from "../../../util/cn.ts";
import { IconClipboardList } from "@tabler/icons-react";
import {
  MdDeleteOutline,
  MdEdit,
  MdMoreVert,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Button, Card, Dropdown, Menu, Modal } from "antd";

export const BoardItem = ({
  id,
  className,
  title,
  description,
  header,
  columns,
  icon,
  is_active,
  handleClick,
  handleDeleteBoard,
  handleEditBoard,
  handleViewBoard,
  permission,
}: {
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  columns?: any;
  is_active: boolean;
  handleClick: (e: any, obj: any) => void;
  handleDeleteBoard: (id: any) => void;
  handleEditBoard: (id: any) => void;
  handleViewBoard: (id: any) => void;
  permission: any;
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = (e, id) => {
    setDeleteModalVisible(true);
  };
  const handleDeleteModalOk = async () => {
    handleDeleteBoard(id);
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false); // Close the modal
  };
  const handleBoardClick = (e) => {
    if (e.target.closest(".ant-dropdown")) {
      return; // Click came from the Dropdown menu, do nothing
    }
    e.stopPropagation();
    const obj = {
      id,
      title,
      description,
      columns,
      is_active,
    };
    handleClick(e, obj);
  };
  const handleEdit = (e, id: any) => {
    handleEditBoard(id);
  };

  const getMenu = (id) => (
    <Menu onClick={(e) => handleMenuClick(e, id)}>
      {permission && permission.can_update ? (
        <Menu.Item key="edit">
          <div className="flex items-center gap-2">
            <MdEdit /> Edit
          </div>
        </Menu.Item>
      ) : null}
      {permission && permission.can_delete ? (
        <Menu.Item key="delete" onClick={(e) => showDeleteModal(e, id)}>
          <div className="flex items-center gap-2">
            <MdDeleteOutline />
            Delete
          </div>
        </Menu.Item>
      ) : null}
      {permission && permission.can_view ? (
        <Menu.Item key="view">
          <div className="flex items-center gap-2">
            <MdOutlineRemoveRedEye />
            View
          </div>
        </Menu.Item>
      ) : null}
    </Menu>
  );
  const handleMenuClick = async (e, item) => {
    if (e.key === "edit") {
      handleEdit(e, item);
    } else if (e.key === "view") {
      handleViewBoard(item);
    }
  };

  return (
    <>
      <Card
        bodyStyle={{ padding: 0, width: "100%" }}
        className={cn(
          "w-full row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4  border border-transparent justify-between flex flex-col items-start space-y-4 hover:cursor-pointer  relative",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleBoardClick(e);
        }}
      >
        {/* {header} */}
        <div className="group-hover/bento:translate-x-1 transition duration-200 text-left flex flex-col gap-2 relative">
          {/* {icon} */}
          <div className="w-full flex items-center justify-between z-10">
            <IconClipboardList />
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
          <div className="font-bold  mb-2 mt-2">{title}</div>
          <div className="font-normal text-xs text-slate-700">
            {description}
          </div>
          <div>
            <span className="text-xs font-semibold ">Columns: </span>
            {columns.map((item, i) => (
              <span key={i} className="text-xs font-semibold uppercase ">
                {item.column_name}
                {i < columns.length - 1 && ", "}
              </span>
            ))}
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
        <p>Are you sure you want to delete this board?</p>
      </Modal>
    </>
  );
};
