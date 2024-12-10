import React from 'react';
import { ColumnProps } from '../types/types';
import TaskComponent from './Task';


const ColumnComponent: React.FC<ColumnProps> = ({
     column,
     editingTask,
     setEditingTask,
     saveEditedTask,
     cancelEdit,
     moveTask,
     deleteTask,
     editTask,
}) => {
     return (
          <div key={column.id} className="w-full md:w-1/3  p-4 border-r-4">
               <div className=''>
                    <h2 className="text-xl font-semibold">{column.title}</h2>
               </div>
               <div>
                    {column.tasks.map((task) => (
                         <TaskComponent
                              key={task.id}
                              task={task}
                              column={column}
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

export default ColumnComponent;
