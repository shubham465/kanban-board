export interface TaskType {
  id: string;
  name: string;
  description: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}
