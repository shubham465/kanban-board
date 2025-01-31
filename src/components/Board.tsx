import { useState, useEffect, useRef } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import Column, { ColumnType } from "./Column";
import {
  saveColumnsToLocalStorage,
  loadColumnsFromLocalStorage,
} from "../utils/localStorageUtils";
import "./Column.css";
import "./Board.css";

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const newColumnTitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedColumns = loadColumnsFromLocalStorage();
    if (storedColumns.length > 0) {
      setColumns(storedColumns);
    } else {
      setColumns([
        { id: "column-1", title: "To Do", tasks: [] },
        { id: "column-2", title: "In Progress", tasks: [] },
        { id: "column-3", title: "Done", tasks: [] },
      ]);
    }
  }, []);

  const updateColumn = (columnId: string, updatedColumn: ColumnType) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) =>
        column.id === columnId ? updatedColumn : column
      );
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  };

  const removeColumn = (columnId: string) => {
    const updatedColumns = columns.filter((column) => column.id !== columnId);
    setColumns(updatedColumns);
    saveColumnsToLocalStorage(updatedColumns);
  };

  const addColumn = () => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: "New Column",
      tasks: [],
    };
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns, newColumn];
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
    setTimeout(() => {
      if (newColumnTitleRef.current) {
        newColumnTitleRef.current.focus();
        newColumnTitleRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );

    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) {
      return;
    }

    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const sourceTasks = Array.from(sourceColumn.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedColumn = { ...sourceColumn, tasks: sourceTasks };
      updateColumn(sourceColumn.id, updatedColumn);
    } else {
      const destinationTasks = Array.from(destinationColumn.tasks);
      destinationTasks.splice(destination.index, 0, movedTask);
      updateColumn(sourceColumn.id, { ...sourceColumn, tasks: sourceTasks });
      updateColumn(destinationColumn.id, {
        ...destinationColumn,
        tasks: destinationTasks,
      });
    }
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
              onClick={addColumn}
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
              updateColumn={updateColumn}
              removeColumn={removeColumn}
              titleRef={
                column.id === columns[columns.length - 1].id
                  ? newColumnTitleRef
                  : undefined
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
