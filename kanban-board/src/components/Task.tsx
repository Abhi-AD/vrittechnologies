import React, { useState } from 'react';
import { TaskProps } from '../types/types';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';



const TaskComponent: React.FC<TaskProps> = ({
     task,
     column,
     editingTask,
     setEditingTask,
     saveEditedTask,
     cancelEdit,
     moveTask,
     deleteTask,
     editTask,
}) => {
     const [editedTitle, setEditedTitle] = useState(task.title);

     const handleSave = () => {
          setEditingTask({ id: task.id, title: editedTitle });
          saveEditedTask();
     };

     const handleCancel = () => {
          cancelEdit();
          setEditedTitle(task.title);
     };

     const availableColumns = [
          { id: 'todo', title: 'TODO' },
          { id: 'inprogress', title: 'In Progress' },
          { id: 'done', title: 'Done' },
     ].filter((col) => col.id !== column.id);

     return (
          <div className="p-2 border rounded mb-2">
               {editingTask && editingTask.id === task.id ? (
                    <div className="flex flex-col gap-2">
                         <input
                              type="text"
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                              className="border p-1 rounded"
                         />
                         <div className="flex justify-between">
                              <button
                                   onClick={handleSave}
                                   className="bg-green-500 text-white px-2 py-1 rounded"
                              >
                                   Save
                              </button>
                              <button
                                   onClick={handleCancel}
                                   className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                   Cancel
                              </button>
                         </div>
                    </div>
               ) : (
                    <div className="flex flex-col gap-3">
                         <span>{task.title}</span>
                         <div className="flex gap-2">
                              <button
                                   onClick={() => editTask(task.id, column.id)}
                                   className="bg-blue-500 text-white px-2 py-1 rounded"
                              >
                                   <AiOutlineEdit />
                              </button>
                              <button
                                   onClick={() => deleteTask(task.id, column)}
                                   className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                   <AiOutlineDelete />
                              </button>
                              {availableColumns.map((col) => (
                                   <button
                                        key={col.id}
                                        onClick={() => moveTask(task.id, column.id, col.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                   >
                                        {col.title}
                                   </button>
                              ))}
                         </div>
                    </div>
               )}
          </div>
     );
};

export default TaskComponent;
