import { Action, Column } from "../types/types";

export const undoAction = (
  undoStack: Action[],
  setUndoStack: React.Dispatch<React.SetStateAction<Action[]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<Action[]>>,
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) => {
  const lastAction = undoStack.pop();
  if (!lastAction) return;

  if (lastAction.type === "move") {
    const { task, fromColumnId, toColumnId } = lastAction;
    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col.id === fromColumnId
          ? {
              ...col,
              tasks: [...col.tasks, task],
            }
          : col.id === toColumnId
          ? {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== task.id),
            }
          : col
      );
    });
    setRedoStack((prevStack) => [...prevStack, lastAction]);
  }
  setUndoStack((prevStack) => prevStack.slice(0, -1));
};

export const redoAction = (
  redoStack: Action[],
  setRedoStack: React.Dispatch<React.SetStateAction<Action[]>>,
  setUndoStack: React.Dispatch<React.SetStateAction<Action[]>>,
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) => {
  const lastUndoneAction = redoStack.pop();
  if (!lastUndoneAction) return;

  if (lastUndoneAction.type === "move") {
    const { task, fromColumnId, toColumnId } = lastUndoneAction;
    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col.id === fromColumnId
          ? {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== task.id),
            }
          : col.id === toColumnId
          ? {
              ...col,
              tasks: [...col.tasks, task],
            }
          : col
      );
    });
    setUndoStack((prevStack) => [...prevStack, lastUndoneAction]);
  }
  setRedoStack((prevStack) => prevStack.slice(0, -1));
};
