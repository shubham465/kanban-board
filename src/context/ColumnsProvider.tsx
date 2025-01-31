import React, { useState, useEffect, useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";

import { ColumnType } from "../types";
import {
  saveColumnsToLocalStorage,
  loadColumnsFromLocalStorage,
} from "../utils/localStorageUtils";
import { ColumnsContext } from "./ColumnContext";

export const ColumnsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

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

  const updateColumn = useCallback(
    (columnId: string, updatedColumn: ColumnType) => {
      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) =>
          column.id === columnId ? updatedColumn : column
        );
        saveColumnsToLocalStorage(updatedColumns);
        return updatedColumns;
      });
    },
    []
  );

  const removeColumn = useCallback((columnId: string) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.filter(
        (column) => column.id !== columnId
      );
      saveColumnsToLocalStorage(updatedColumns);
      return updatedColumns;
    });
  }, []);

  const addColumn = useCallback(() => {
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
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
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
    },
    [columns, updateColumn]
  );

  return (
    <ColumnsContext.Provider
      value={{ columns, addColumn, updateColumn, removeColumn, onDragEnd }}
    >
      {children}
    </ColumnsContext.Provider>
  );
};
