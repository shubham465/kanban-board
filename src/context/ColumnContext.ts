import { createContext } from "react";
import { DropResult } from "@hello-pangea/dnd";

import { ColumnType } from "../types";

interface ColumnsContextType {
  columns: ColumnType[];
  addColumn: () => void;
  updateColumn: (columnId: string, updatedColumn: ColumnType) => void;
  removeColumn: (columnId: string) => void;
  onDragEnd: (result: DropResult) => void;
}

export const ColumnsContext = createContext<ColumnsContextType>({
  columns: [],
  addColumn: () => {},
  updateColumn: () => {},
  removeColumn: () => {},
  onDragEnd: () => {},
});
