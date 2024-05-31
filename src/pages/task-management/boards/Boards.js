import { IconClipboardList } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { BoardItem } from "./BoardItem.tsx";
import PermittedButton from "../../../components/PermittedButton/PermittedButton.tsx";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPermissionsForMenu } from "../../../util/helper.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Empty, Modal, Result } from "antd";
import CreateBoard from "../create-board/CreateBoard.js";
import {
  deleteBoard,
  getBoards,
  saveBoard,
} from "../../../redux/task-management/taskManagementSlice.js";
import toast from "react-hot-toast";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-200 to-neutral-100"></div>
);

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
  const [isView, setIsView] = useState(false);

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
    dispatch(deleteBoard(id)).then(() => {
      toast.success("Board deleted", { duration: 3000 });
      dispatch(getBoards());
    });
  };

  const handleEditBoard = (id) => {
    const board = boardList.find((x) => x.id === id);
    setIsAdd(false);
    setSelectedBoard(board);
    setIsOpen(true);
    setIsView(false);
  };
  const handleViewBoard = (id) => {
    const board = boardList.find((x) => x.id === id);
    setIsAdd(false);
    setSelectedBoard(board);
    setIsOpen(true);
    setIsView(true);
  };

  const handleClickToEditBoard = (e, board) => {
    e.stopPropagation();

    navigate(`/task-management/task-manipulation/${board.id}`, {
      replace: true,
      state: {
        boardId: board.id,
        board: board,
        permission: permission,
      },
    });
  };

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
              handleViewBoard={handleViewBoard}
              permission={permission}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-1/2 flex items-center justify-center">
          <Empty description="No Boards Found" className="font-semibold" />
        </div>
      )}

      {isOpen && (
        <CreateBoard
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          isAdd={isAdd}
          isView={isView}
          handleAdd={handleAdd}
          data={selectedBoard}
          permission={permission}
        />
      )}
    </div>
  );
};

export default Boards;
