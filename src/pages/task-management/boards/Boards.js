import { IconClipboardList } from "@tabler/icons-react";
import React, { useState } from "react";
import { BoardItem } from "./BoardItem.tsx";
import PermittedButton from "../../../components/PermittedButton/PermittedButton.tsx";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { getPermissionsForMenu } from "../../../util/helper.js";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import CreateBoard from "../create-board/CreateBoard.js";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-200 to-neutral-100"></div>
);

const boardItems = [
  {
    id: 1,
    title: "Board 1",
    description: "This is a description of board 1",
    header: <Skeleton />,
    icon: <IconClipboardList />,
    columns: ["todo", "in progress", "done"],
  },
  {
    id: 2,
    title: "Board 2",
    description:
      "This is a description of board 2This is a description of board 2This is a description of board 2",
    header: <Skeleton />,
    icon: <IconClipboardList />,
    columns: ["todo", "in progress", "qa", "done"],
  },
];

const Boards = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [boardList, setBoardList] = useState(boardItems);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const menus = useSelector((state) => state.auth.menus);

  const permission = getPermissionsForMenu(
    menus,
    location && location.pathname
  );

  const handleModalOpen = () => {
    setIsOpen(true);
    setSelectedBoard(null);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleAdd = (board) => {
    const newList = [...boardList, board];
    setBoardList(newList);
  };

  const handleDeleteBoard = (id) => {
    const newList = boardList.filter((x) => x.id !== id);
    setBoardList(newList);
  };

  const handleClick = (board) => {
    setIsAdd(false);
    setSelectedBoard(board);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end mt-5">
        <PermittedButton
          text="Create New Board"
          type="primary"
          icon={<MdAdd />}
          handleClick={handleModalOpen}
          permission={permission}
          permissionType="add"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {boardList.map((board, index) => (
          <BoardItem
            key={index}
            title={board.title}
            description={board.description}
            header={board.header}
            icon={board.icon}
            columns={board.columns}
            is_active={board.is_active}
            handleClick={handleClick}
            handleDeleteBoard={handleDeleteBoard}
          />
        ))}
      </div>

      {isOpen && (
        <CreateBoard
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          isAdd={isAdd}
          handleAdd={handleAdd}
          data={selectedBoard}
        />
      )}
    </div>
  );
};

export default Boards;
