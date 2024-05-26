import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import DropIndicator from "./DropIndicator";
import AddTask from "./AddTask";

const BoardColumn = ({ title, headingColor, tasks, column }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragEnd = (e) => {
    const taskId = e.dataTransfer.getData("taskId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== taskId) {
      let copy = [...tasks];

      let taskToTransfer = copy.find((c) => c.id === taskId);
      if (!taskToTransfer) return;
      taskToTransfer = { ...taskToTransfer, column };

      copy = copy.filter((c) => c.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(taskToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, taskToTransfer);
      }

      //need to implement some logic here
      //setTasks(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = tasks.filter((c) => c.column_name === column);

  return (
    <div className="w-72 shrink-0">
      <div className="mb-3 flex items-center justify-between bg-indigo-100 px-4 py-2 rounded-lg">
        <h3 className={`font-medium uppercase text-xs ${headingColor}`}>
          {title}
        </h3>
        <span className="rounded-full text-white text-xs font-semibold bg-indigo-500 size-6 flex items-center justify-center">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {filteredCards.map((c) => {
          return (
            <TaskCard
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              className="cursor-grab active:cursor-grabbing"
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddTask column={column} /> */}
      </div>
    </div>
  );
};

export default BoardColumn;
