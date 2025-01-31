import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { TaskType } from "../types";

interface TaskProps {
  task: TaskType;
  updateTask: (taskId: string, updatedTask: TaskType) => void;
  removeTask: (taskId: string) => void;
  index: number;
  titleRef?: React.RefObject<HTMLDivElement>;
}

const Task: React.FC<TaskProps> = ({
  task,
  updateTask,
  removeTask,
  titleRef,
}) => {
  const [name] = useState(task.name);
  const [description] = useState(task.description);

  return (
    <div className="bg-gray-700 p-4 rounded mb-4 shadow-md relative group transition cursor-grab hover:ring-2 hover:ring-inset hover:ring-rose-500">
      <div
        className="text-xl font-bold text-white mb-2 bg-transparent focus:outline-none break-words whitespace-normal"
        contentEditable
        onBlur={(e) => {
          updateTask(task.id, {
            ...task,
            name: e.currentTarget.textContent ?? "",
          });
        }}
        suppressContentEditableWarning={true}
        ref={titleRef}
      >
        {name}
      </div>
      <div
        className="bg-gray-600 h-20 p-2 rounded text-white focus:outline-none focus:border-blue-500 break-words whitespace-normal"
        contentEditable
        onFocus={(e) => {
          if (e.currentTarget.textContent === "Add description") {
            e.currentTarget.textContent = "";
          }
        }}
        onBlur={(e) => {
          const newDescription = e.currentTarget.textContent;
          if (newDescription === "") {
            e.currentTarget.textContent = "Add description";
          }
          updateTask(task.id, { ...task, description: newDescription ?? "" });
        }}
        suppressContentEditableWarning={true}
      >
        {description || "Add description"}
      </div>
      <button
        onClick={() => removeTask(task.id)}
        className="absolute top-2 right-2 text-gray-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="text-sm hover:animate-bounce"
        />
      </button>
    </div>
  );
};

export default React.memo(Task);
