export interface Task {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Action {
  type: "add" | "edit" | "delete" | "move";
  task: Task;
  fromColumnId: string;
  toColumnId: string;
  previousTitle?: string;
}

export interface ColumnProps {
  column: Column;
  editingTask: { id: string; title: string } | null;
  setEditingTask: React.Dispatch<
    React.SetStateAction<{ id: string; title: string } | null>
  >;
  saveEditedTask: () => void;
  cancelEdit: () => void;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  deleteTask: (taskId: string, column: Column) => void;
  editTask: (taskId: string, columnId: string) => void;
}

export interface TaskProps {
  task: Task;
  column: Column;
  editingTask: { id: string; title: string } | null;
  setEditingTask: React.Dispatch<
    React.SetStateAction<{ id: string; title: string } | null>
  >;
  saveEditedTask: () => void;
  cancelEdit: () => void;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  deleteTask: (taskId: string, column: Column) => void;
  editTask: (taskId: string, columnId: string) => void;
}
