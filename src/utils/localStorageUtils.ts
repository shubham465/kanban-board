// filepath: /E:/Projects/kanban-board/src/utils/localStorageHelpers.ts

export const saveColumnsToLocalStorage = (columns: any) => {
  localStorage.setItem("columns", JSON.stringify(columns));
};

export const loadColumnsFromLocalStorage = () => {
  const columns = localStorage.getItem("columns");
  return columns ? JSON.parse(columns) : [];
};
