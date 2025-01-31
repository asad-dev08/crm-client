import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import DropIndicator from "./DropIndicator";
import AddTask from "./AddTask";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../../redux/task-management/taskManagementSlice";
import toast from "react-hot-toast";

const BoardColumn = ({
  title,
  headingColor,
  tasks,
  column,
  column_id,
  handleUpdate,
  board_id,
  columns,
  permission,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragEnd = (e) => {
    if (permission && !permission.can_update) {
      clearHighlights();
      toast.error(
        "Your don't have edit permission so you can not modify any task!",
        { duration: 3000 }
      );
      return;
    }
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
      taskToTransfer = { ...taskToTransfer, column_name: column, column_id };

      copy = copy.filter((c) => c.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(taskToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, taskToTransfer);
      }
      //update task
      dispatch(updateTask(taskToTransfer)).then(() => {
        handleUpdate();
      });
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

  const filteredCards = tasks
    .filter((c) => c.column_name === column)
    .sort((a, b) => parseInt(b.sequence_no, 10) - parseInt(a.sequence_no, 10));

  return (
    <div className="w-72 shrink-0">
      <div className="mb-3 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg">
        <h3 className={`font-medium uppercase text-xs ${headingColor}`}>
          {title}
        </h3>
        <span className="rounded-full text-white text-xs  bg-indigo-500 size-6 flex items-center justify-center">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((c) => {
            const username =
              c.users &&
              c.users.length > 0 &&
              c.users.map((user) => user.username).join(", ");
            const userid =
              c.users &&
              c.users.length > 0 &&
              c.users.map((user) => user.user_id).join(", ");

            return (
              <TaskCard
                key={c.id}
                {...c}
                username={username}
                user_id={userid}
                columns={columns}
                handleDragStart={handleDragStart}
                taskCount={filteredCards.length}
                className="cursor-grab active:cursor-grabbing"
                task_users={c.users}
                permission={permission}
              />
            );
          })
        ) : (
          <div className="text-xs py-5 border-2 rounded-lg my-5 border-dashed">
            If you have task in other column you can change that taks's column
            by dragging
          </div>
        )}
        <DropIndicator
          beforeId={null}
          column={column}
          taskCount={filteredCards.length}
        />
        {/* <AddTask column={column} /> */}
      </div>
    </div>
  );
};

export default BoardColumn;
