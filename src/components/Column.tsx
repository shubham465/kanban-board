import React, { useState, useCallback } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import "./Column.css"; // Import the CSS file for custom scrollbar styles

const Column: React.FC<{
  column: any;
  updateColumn: any;
  removeColumn: any;
  titleRef?: React.RefObject<HTMLDivElement>;
}> = ({ column, updateColumn, removeColumn, titleRef }) => {
  const [title] = useState(column.title);

  const addTask = useCallback(() => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: "Task",
      description: "",
    };
    updateColumn(column.id, { ...column, tasks: [...column.tasks, newTask] });
  }, [column, updateColumn]);

  const removeTask = useCallback(
    (taskId: string) => {
      updateColumn(column.id, {
        ...column,
        tasks: column.tasks.filter((task: any) => task.id !== taskId),
      });
    },
    [column, updateColumn]
  );

  const updateTask = useCallback(
    (taskId: string, updatedTask: any) => {
      updateColumn(column.id, {
        ...column,
        tasks: column.tasks.map((task: any) =>
          task.id === taskId ? updatedTask : task
        ),
      });
    },
    [column, updateColumn]
  );

  return (
    <div
      className="bg-gray-800  rounded-lg shadow-lg"
      style={{ minWidth: "300px", maxWidth: "300px" }}
    >
      <div className="bg-gray-700 p-3 flex flex-row justify-between items-center">
        <div
          className="text-xl font-bold text-white focus:outline-none"
          contentEditable
          onBlur={(e) => {
            updateColumn(column.id, {
              ...column,
              title: e.currentTarget.textContent,
            });
          }}
          suppressContentEditableWarning={true}
          ref={titleRef}
        >
          {title}
        </div>
        <div className="flex space-x-2">
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
            className="space-y-2 overflow-y-auto h-full p-4 custom-scrollbar"
            style={{ maxHeight: "65vh" }}
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

export default Column;
