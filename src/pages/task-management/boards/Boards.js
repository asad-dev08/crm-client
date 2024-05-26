import { IconClipboardList } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { BoardItem } from "./BoardItem.tsx";
import PermittedButton from "../../../components/PermittedButton/PermittedButton.tsx";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPermissionsForMenu } from "../../../util/helper.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Result } from "antd";
import CreateBoard from "../create-board/CreateBoard.js";
import {
  getBoards,
  saveBoard,
} from "../../../redux/task-management/taskManagementSlice.js";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  //const [boardList, setBoardList] = useState(boardItems);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const menus = useSelector((state) => state.auth.menus);
  const boardList = useSelector((state) => state.taskManagement.boards);

  const permission = getPermissionsForMenu(
    menus,
    location && location.pathname
  );
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
    setSelectedBoard(null);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    dispatch(getBoards());
  };

  const handleDeleteBoard = (id) => {
    const newList = boardList.filter((x) => x.id !== id);
    //delete
  };

  const handleEditBoard = (id) => {
    const board = boardList.find((x) => x.id === id);
    setIsAdd(false);
    setSelectedBoard(board);
    setIsOpen(true);
  };

  const handleClickToEditBoard = (e, board) => {
    e.stopPropagation();
    console.log(board);
    navigate(`/task-management/task-manipulation/${board.id}`, {
      replace: true,
      state: {
        boardId: board.id,
        board: board,
        permission: permission,
      },
    });
  };

  console.log("boards: ", boardList);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <PermittedButton
          text="Create New Board"
          type="primary"
          icon={<MdAdd />}
          handleClick={handleModalOpen}
          permission={permission}
          permissionType="add"
        />
      </div>
      {boardList && boardList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {boardList.map((board, index) => (
            <BoardItem
              key={index}
              id={board.id}
              title={board.title}
              description={board.description}
              header={board.header}
              icon={board.icon}
              columns={board.columns}
              is_active={board.is_active}
              handleClick={handleClickToEditBoard}
              handleDeleteBoard={handleDeleteBoard}
              handleEditBoard={handleEditBoard}
            />
          ))}
        </div>
      ) : (
        <Result title="No Board Found" />
      )}

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
