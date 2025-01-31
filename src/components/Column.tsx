import React, { useState, useCallback, useContext } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import Task from "./Task";
import { ColumnsContext } from "../context/ColumnContext";
import { ColumnType, TaskType } from "../types";
import { useNewItem } from "../hooks/useNewItem";

const Column: React.FC<{
  column: ColumnType;
  titleRef?: React.RefObject<HTMLDivElement>;
}> = ({ column, titleRef }) => {
  const { updateColumn, removeColumn } = useContext(ColumnsContext);
  const [title, setTitle] = useState(column.title);
  const { isNewItemAdded, setIsNewItemAdded, newItemRef } = useNewItem();

  const addTask = useCallback(() => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: "Task",
      description: "",
    };
    updateColumn(column.id, { ...column, tasks: [...column.tasks, newTask] });
    setIsNewItemAdded(true);
  }, [column, updateColumn, setIsNewItemAdded]);

  const removeTask = useCallback(
    (taskId: string) => {
      updateColumn(column.id, {
        ...column,
        tasks: column.tasks.filter((task: TaskType) => task.id !== taskId),
      });
    },
    [column, updateColumn]
  );

  const updateTask = useCallback(
    (taskId: string, updatedTask: TaskType) => {
      updateColumn(column.id, {
        ...column,
        tasks: column.tasks.map((task: TaskType) =>
          task.id === taskId ? updatedTask : task
        ),
      });
    },
    [column, updateColumn]
  );

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg"
      style={{ minWidth: "300px", maxWidth: "300px" }}
    >
      <div className="bg-gray-700 p-3 flex flex-row justify-between items-center min-w-0 overflow-hidden">
        <div
          className="text-xl font-bold text-white focus:outline-none truncate flex-grow overflow-hidden"
          contentEditable
          onFocus={(e) => {
            e.currentTarget.classList.remove("truncate");
          }}
          onBlur={(e) => {
            e.currentTarget.classList.add("truncate");
            updateColumn(column.id, {
              ...column,
              title: e.currentTarget.textContent ?? "",
            });
            setTitle(e.currentTarget.textContent ?? "");
          }}
          suppressContentEditableWarning={true}
          ref={titleRef}
          title={title}
        >
          {title}
        </div>
        <div className="flex space-x-2 flex-shrink-0">
          <button
            onClick={addTask}
            className="text-gray-400 p-1 rounded-full hover:text-green-500 transition duration-200"
          >
            <FontAwesomeIcon icon={faPlus} className="text-2xl" />
          </button>
          <button
            onClick={() => removeColumn(column.id)}
            className="text-gray-400 p-1 rounded-full hover:text-red-500 transition duration-200"
          >
            <FontAwesomeIcon icon={faTrash} className="text-lg" />
          </button>
        </div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 overflow-x-hidden overflow-y-auto h-full p-4 custom-scrollbar"
            style={{ maxHeight: "65vh", whiteSpace: "nowrap" }}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      task={task}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      index={index}
                      titleRef={
                        index === column.tasks.length - 1 && isNewItemAdded
                          ? newItemRef
                          : undefined
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default React.memo(Column);
