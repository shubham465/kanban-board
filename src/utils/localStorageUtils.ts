import { ColumnType } from "../types";

export const saveColumnsToLocalStorage = (columns: ColumnType[]) => {
  localStorage.setItem("columns", JSON.stringify(columns));
};

export const loadColumnsFromLocalStorage = (): ColumnType[] => {
  const columns = localStorage.getItem("columns");
  return columns ? JSON.parse(columns) : [];
};
