import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import KanbanBoard from '../components/KanbanBoard';

describe('KanbanBoard', () => {
     let container: HTMLElement;

     beforeEach(() => {
          // Capture the container from the render method
          const rendered = render(<KanbanBoard />);
          container = rendered.container;

          // Debug: Log the current DOM to check the buttons
          console.log("Rendered DOM:", container.innerHTML);
          screen.debug();
     });

     test('should add a new task', async () => {
          const taskInput = screen.getByRole('textbox');
          const addButton = screen.getByRole('button', { name: /Add Task/i });

          fireEvent.change(taskInput, { target: { value: 'Test Task' } });
          fireEvent.click(addButton);

          await waitFor(() => {
               expect(screen.getByText('Test Task')).toBeInTheDocument();
          });
     });

     test('should edit a task', async () => {
          const taskInput = screen.getByRole('textbox');
          const addButton = screen.getByRole('button', { name: /Add Task/i });
          fireEvent.change(taskInput, { target: { value: 'Test Task' } });
          fireEvent.click(addButton);

          // Debugging: Log the DOM state before interaction
          console.log("Before Edit:", container.innerHTML);

          // Wait for the edit button to appear
          const editButton = await screen.findByRole('button', { name: /edit/i });
          console.log("Found Edit Button:", editButton); // Log to confirm button is found
          fireEvent.click(editButton);

          const taskInputForEdit = screen.getByDisplayValue('Test Task');
          fireEvent.change(taskInputForEdit, { target: { value: 'Updated Task' } });

          // Save the changes by clicking the save button
          const saveButton = screen.getByRole('button', { name: /Save/i });
          fireEvent.click(saveButton);

          await waitFor(() => {
               expect(screen.getByText('Updated Task')).toBeInTheDocument();
          });
     });

     test('should move a task between columns', async () => {
          const taskInput = screen.getByRole('textbox');
          const addButton = screen.getByRole('button', { name: /Add Task/i });
          fireEvent.change(taskInput, { target: { value: 'Test Task' } });
          fireEvent.click(addButton);

          // Wait for the move button to appear
          const moveButton = await screen.findByRole('button', { name: /In Progress/i });
          fireEvent.click(moveButton);

          // Wait for the task to appear in the new column
          await waitFor(() => {
               expect(screen.getByText('Test Task')).toBeInTheDocument();
               expect(screen.getByText('In Progress')).toBeInTheDocument();
          });
     });

     test('should undo and redo actions', async () => {
          const taskInput = screen.getByRole('textbox');
          const addButton = screen.getByRole('button', { name: /Add Task/i });
          fireEvent.change(taskInput, { target: { value: 'Test Task' } });
          fireEvent.click(addButton);

          // Wait for the undo button to appear
          const undoButton = await screen.findByRole('button', { name: /Undo/i });
          fireEvent.click(undoButton);

          await waitFor(() => {
               expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
          });

          // Wait for the redo button to appear
          const redoButton = await screen.findByRole('button', { name: /Redo/i });
          fireEvent.click(redoButton);

          await waitFor(() => {
               expect(screen.getByText('Test Task')).toBeInTheDocument();
          });
     });
});
