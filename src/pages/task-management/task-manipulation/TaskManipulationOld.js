import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BoardColumn from "./_components/BoardColumn";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BurnBarrel from "./_components/BurnBarrel";

const dummyTaskList = [
  { id: 1, title: "finding customer", column: "todo" },
  { id: 2, title: "task 1", column: "todo" },
  { id: 3, title: "task 2", column: "done" },
  { id: 4, title: "task 3", column: "todo" },
  { id: 5, title: "task 4", column: "in progress" },
  { id: 6, title: "task 5", column: "done" },
];

const TaskManipulationOld = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(dummyTaskList);
  const [activeId, setActiveId] = useState(null);

  // TODO will get the board by id when backend is ready now working with state

  const { state } = location;
  const board = state.board;
  const { id } = params;
  console.log(board);

  const handleBack = () => {
    navigate("/task-management/boards", { replace: true });
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    if (event.over) {
      const { source, destination } = event;
      if (source.column !== destination.column) {
        const sourceTask = tasks.find((task) => task.id === source.id);
        if (sourceTask) {
          sourceTask.column = destination.column;
          setTasks(
            tasks.map((task) => (task.id === source.id ? sourceTask : task))
          );
        }
      }
    }
    setActiveId(null);
  };

  return (
    <div className="w-full">
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
      </div>
      <div className="my-3 w-full flex gap-3">
        {board.columns.map((item, index) => (
          <BoardColumn
            key={index}
            title={item}
            headingColor={"text-indigo-600"}
            column={item}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
        <BurnBarrel setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskManipulationOld;
