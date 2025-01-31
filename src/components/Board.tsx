import React, { useContext, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import Column from "./Column";
import { ColumnsContext } from "../context/ColumnContext";
import "./Board.css";
import { useNewItem } from "../hooks/useNewItem";

const Board: React.FC = () => {
  const { columns, addColumn, onDragEnd } = useContext(ColumnsContext);
  const { isNewItemAdded, setIsNewItemAdded, newItemRef } = useNewItem();

  useEffect(() => {
    if (isNewItemAdded && newItemRef.current) {
      newItemRef.current.focus();
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
      setIsNewItemAdded(false);
    }
  }, [columns.length, isNewItemAdded, setIsNewItemAdded, newItemRef]);

  const handleAddColumn = () => {
    addColumn();
    setIsNewItemAdded(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="title-text text-white mb-8 text-center flex-grow">
          Kanban Board
        </h1>
        <div className="flex items-center justify-end">
          <div className="bg-gray-800 p-2 rounded-full shadow-lg">
            <button
              onClick={handleAddColumn}
              className="text-white px-4 py-2 rounded-full flex items-center justify-center text-xl w-12 md:w-48 font-bold hover:bg-gray-700 transition duration-200"
            >
              <span className="hidden md:block">+ Add Column</span>
              <span className="block md:hidden">+</span>
            </button>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 items-start custom-scrollbar overflow-x-scroll">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              titleRef={
                column.id === columns[columns.length - 1].id
                  ? newItemRef
                  : undefined
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default React.memo(Board);
