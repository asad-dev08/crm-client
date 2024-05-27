import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BoardColumn from "./_components/BoardColumn";
import { MdAdd, MdArrowBack } from "react-icons/md";
import PermittedButton from "../../../components/PermittedButton/PermittedButton.tsx";
import AddTask from "./_components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { getTaskByBoard } from "../../../redux/task-management/taskManagementSlice.js";
import { Result } from "antd";

const TaskManipulation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdd, setIsAdd] = useState(true);
  const tasks = useSelector((state) => state.taskManagement.tasks);

  const { state } = location;
  const { board, permission } = state;
  const { id } = params;

  useEffect(() => {
    dispatch(getTaskByBoard({ board_id: id }));
  }, [id, dispatch]);

  const handleModalOpen = () => {
    setIsOpen(true);
    setSelectedTask(null);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleAdd = () => {
    dispatch(getTaskByBoard({ board_id: id }));
  };
  const handleUpdate = () => {
    dispatch(getTaskByBoard({ board_id: id }));
  };

  const handleBack = () => {
    navigate("/task-management/boards", { replace: true });
  };

  return (
    <div className="h-screen w-full overflow-x-auto">
      <div className="w-full flex items-center justify-between pr-5">
        <label
          className="flex items-center gap-1 hover:cursor-pointer group"
          onClick={handleBack}
        >
          <MdArrowBack className="group-hover:scale-[1.2] group-hover:text-slate-500  text-xs" />
          <span className="text-xs  hover:text-slate-500 font-semibold">
            Back to Board List
          </span>
        </label>
        <PermittedButton
          text="Create New Task"
          type="primary"
          icon={<MdAdd />}
          handleClick={handleModalOpen}
          permission={permission}
          permissionType="add"
        />
      </div>
      {tasks && tasks.length > 0 ? (
        <Board board={board} tasks={tasks} handleUpdate={handleUpdate} />
      ) : (
        <Result title="No Task Found" />
      )}
      {isOpen && (
        <AddTask
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          isAdd={isAdd}
          handleAdd={handleAdd}
          data={selectedTask}
          board_id={id}
          columns={
            board &&
            board.columns.length > 0 &&
            board.columns.map((col) => {
              return { label: col.column_name, value: col.id };
            })
          }
        />
      )}
    </div>
  );
};

const Board = ({ board, tasks, handleUpdate }) => {
  return (
    <div className="my-5 w-full flex gap-3">
      {board.columns.map((item, index) => (
        <BoardColumn
          title={item.column_name}
          column={item.column_name}
          column_id={item.id}
          headingColor="text-indigo-500"
          tasks={tasks}
          handleUpdate={handleUpdate}
          board_id={board.id}
          columns={board.columns}
        />
      ))}
      {/* <BurnBarrel setTasks={setTasks} /> */}
    </div>
  );
};

const BurnBarrel = ({ setTasks }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId");

    setTasks((pv) => pv.filter((c) => c.id !== taskId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default TaskManipulation;
