import { ColumnType } from "../components/Column";

export const saveColumnsToLocalStorage = (columns: ColumnType[]) => {
  localStorage.setItem("columns", JSON.stringify(columns));
};

export const loadColumnsFromLocalStorage = () => {
  const columns = localStorage.getItem("columns");
  return columns ? JSON.parse(columns) : [];
};
