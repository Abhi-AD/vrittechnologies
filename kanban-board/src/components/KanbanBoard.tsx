import React, { useState } from 'react';
import { Action, Column } from '../types/types';
import ColumnComponent from './Column';
import { undoAction, redoAction } from '../utils/undoRedo';

const KanbanBoard: React.FC = () => {
     const [columns, setColumns] = useState<Column[]>([
          { id: 'todo', title: 'TODO', tasks: [] },
          { id: 'inprogress', title: 'In Progress', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
     ]);
     const [newTask, setNewTask] = useState('');
     const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);
     const [undoStack, setUndoStack] = useState<Action[]>([]);
     const [redoStack, setRedoStack] = useState<Action[]>([]);

     const addTask = () => {
          if (!newTask.trim()) return;
          const task = { id: `task-${Date.now()}`, title: newTask.trim() };
          setColumns((prevColumns) =>
               prevColumns.map((col) => (col.id === 'todo' ? { ...col, tasks: [...col.tasks, task] } : col))
          );
          setNewTask('');
          setUndoStack((prevStack) => [
               ...prevStack,
               { type: 'add', task, fromColumnId: '', toColumnId: 'todo' },
          ]);
     };

     const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
          const task = columns.find((col) => col.id === fromColumnId)?.tasks.find((t) => t.id === taskId);
          if (!task) return;

          setColumns((prevColumns) => {
               const updatedColumns = prevColumns.map((col) => {
                    if (col.id === fromColumnId) {
                         return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
                    } else if (col.id === toColumnId) {
                         return { ...col, tasks: [...col.tasks, task] };
                    }
                    return col;
               });
               return updatedColumns;
          });

          setUndoStack((prevStack) => [
               ...prevStack,
               { type: 'move', task, fromColumnId, toColumnId },
          ]);
     };

     const deleteTask = (taskId: string, column: Column) => {
          setColumns((prevColumns) =>
               prevColumns.map((col) => {
                    if (col.id === column.id) {
                         return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
                    }
                    return col;
               })
          );
          setUndoStack((prevStack) => [
               ...prevStack,
               { type: 'delete', task: column.tasks.find((t) => t.id === taskId)!, fromColumnId: column.id, toColumnId: '' },
          ]);
     };

     const saveEditedTask = () => {
          if (!editingTask) return;

          setColumns((prevColumns) => {
               return prevColumns.map((col) => {
                    if (col.id === editingTask.id) {
                         return { ...col, tasks: col.tasks.map((t) => (t.id === editingTask.id ? editingTask : t)) };
                    }
                    return col;
               });
          });

          setUndoStack([
               ...undoStack,
               {
                    type: 'edit',
                    task: editingTask,
                    fromColumnId: '',
                    toColumnId: '',
                    previousTitle: editingTask.title,
               },
          ]);
     };
     const editTask = (taskId: string, columnId: string) => {
          // Find the task to edit
          const task = columns
               .find((col) => col.id === columnId)
               ?.tasks.find((t) => t.id === taskId);

          if (!task) return;

          // Set the editing task
          setEditingTask(task);
     };


     const cancelEdit = () => setEditingTask(null);

     return (
          <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
               <div className="flex flex-row items-center justify-between">
                    <div className='flex flex-row gap-2  items-center'>
                         <input
                              type="text"
                              value={newTask}
                              onChange={(e) => setNewTask(e.target.value)}
                              className="border p-2 rounded "
                         />
                         <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
                              Add Task
                         </button>
                    </div>
                    <div className='flex flex-row gap-2'>
                         <button onClick={() => undoAction(undoStack, setUndoStack, setRedoStack, setColumns)} className="bg-gray-500 text-white p-2 rounded">
                              Undo
                         </button>
                         <button onClick={() => redoAction(redoStack, setRedoStack, setUndoStack, setColumns)} className="bg-gray-500 text-white p-2 rounded">
                              Redo
                         </button>
                    </div>
               </div>

               <div className="flex justify-between  px-4 sm:px-6 lg:px-8 border p-4">
                    {columns.map((col) => (
                         <ColumnComponent
                              key={col.id}
                              column={col}
                              editingTask={editingTask}
                              setEditingTask={setEditingTask}
                              saveEditedTask={saveEditedTask}
                              cancelEdit={cancelEdit}
                              moveTask={moveTask}
                              deleteTask={deleteTask}
                              editTask={editTask}
                         />
                    ))}
               </div>

          </div>
     );
};

export default KanbanBoard;
