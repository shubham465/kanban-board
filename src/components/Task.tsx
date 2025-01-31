import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Task: React.FC<{
  task: any;
  updateTask: any;
  removeTask: any;
  index: number;
  titleRef?: React.RefObject<HTMLDivElement>;
}> = ({ task, updateTask, removeTask, titleRef }) => {
  const [name] = useState(task.name);
  const [description] = useState(task.description);

  return (
    <div className="bg-gray-700 p-4 rounded mb-4 shadow-md relative group transition duration-200 hover:border-2 hover:border-red-500">
      <div
        className="text-xl font-bold text-white mb-2 bg-transparent focus:outline-none"
        contentEditable
        onBlur={(e) => {
          updateTask(task.id, { ...task, name: e.currentTarget.textContent });
        }}
        suppressContentEditableWarning={true}
        ref={titleRef}
      >
        {name}
      </div>
      <div
        className="bg-gray-600 p-2 rounded text-white focus:outline-none focus:border-blue-500"
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
          updateTask(task.id, { ...task, description: newDescription });
        }}
        suppressContentEditableWarning={true}
      >
        {description || "Add description"}
      </div>
      <button
        onClick={() => removeTask(task.id)}
        className="absolute top-2 right-2 text-gray-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FontAwesomeIcon icon={faTrash} className="text-sm" />
      </button>
    </div>
  );
};

export default Task;
