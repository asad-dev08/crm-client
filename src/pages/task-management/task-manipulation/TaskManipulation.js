import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BoardColumn from "./_components/BoardColumn";
import { MdAdd, MdArrowBack } from "react-icons/md";
import PermittedButton from "../../../components/PermittedButton/PermittedButton.tsx";
import AddTask from "./_components/AddTask";

const TaskManipulation = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(DEFAULT_CARDS);
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdd, setIsAdd] = useState(true);

  const { state } = location;
  const { board, permission } = state;
  const { id } = params;

  const handleModalOpen = () => {
    setIsOpen(true);
    setSelectedTask(null);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleAdd = (task) => {
    const newList = [...tasks, task];
    setTasks(newList);
  };

  const handleBack = () => {
    navigate("/task-management/boards", { replace: true });
  };

  return (
    <div className="h-screen w-full">
      <div className="w-full flex items-center justify-between">
        <label
          className="flex items-center gap-1 hover:cursor-pointer group"
          onClick={handleBack}
        >
          <MdArrowBack className="group-hover:scale-[1.2] group-hover:text-slate-700  text-xs" />
          <span className="text-xs text-black hover:text-slate-700 font-semibold">
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
      <Board board={board} tasks={tasks} setTasks={setTasks} />
      {isOpen && (
        <AddTask
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          isAdd={isAdd}
          handleAdd={handleAdd}
          data={selectedTask}
          columns={
            board &&
            board.columns.length > 0 &&
            board.columns.map((x) => {
              return { label: x, value: x };
            })
          }
          setTasks={setTasks}
        />
      )}
    </div>
  );
};

const Board = ({ board, tasks, setTasks }) => {
  return (
    <div className="my-3 w-full flex gap-3">
      {board.columns.map((item, index) => (
        <BoardColumn
          title={item}
          column={item}
          headingColor="text-indigo-500"
          tasks={tasks}
          setTasks={setTasks}
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
const DEFAULT_CARDS = [
  // BACKLOG
  {
    title: "Look into render bug in dashboard",
    id: "1",
    column: "in progress",
  },
  { title: "SOX compliance checklist", id: "2", column: "in progress" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "in progress" },
  { title: "Document Notifications service", id: "4", column: "in progress" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "done",
  },
  { title: "Add logging to daily CRON", id: "9", column: "done" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

export default TaskManipulation;
