import React, { useState } from "react";
import { cn } from "../../../util/cn.ts";
import { IconClipboardList } from "@tabler/icons-react";
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from "antd";

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
}: {
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  columns?: any;
  is_active: boolean;
  handleClick: (obj: any) => void;
  handleDeleteBoard: (id: any) => void;
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
  const handleBoardClick = () => {
    const obj = {
      id,
      title,
      description,
      columns,
      is_active,
    };
    handleClick(obj);
  };
  return (
    <>
      <div
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4  bg-white border border-transparent justify-between flex flex-col items-start space-y-4 hover:cursor-pointer hover:bg-slate-50 relative",
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleBoardClick();
        }}
      >
        <div
          className="absolute top-3 right-3 h-8 w-8 bg-red-100 hover:bg-red-300 text-red-700 rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            showDeleteModal(e, id);
          }}
        >
          <MdDeleteOutline className="size-4" />
        </div>
        {/* {header} */}
        <div className="group-hover/bento:translate-x-2 transition duration-200 text-left flex flex-col gap-2 relative">
          {/* {icon} */}
          <IconClipboardList />
          <div className="font-bold text-black mb-2 mt-2">{title}</div>
          <div className="font-normal text-xs text-slate-700">
            {description}
          </div>
          <div>
            <span className="text-xs font-semibold ">Columns: </span>
            {columns.map((item, i) => (
              <span key={i} className="text-xs font-semibold uppercase">
                {item}
                {i < columns.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
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
