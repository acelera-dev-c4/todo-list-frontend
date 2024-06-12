import React from 'react';

import { Add } from '@mui/icons-material';

interface AddTaskProps {
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  handleCreateMainTask: () => void;
}

function AddTask({ newTaskDescription, setNewTaskDescription, handleCreateMainTask }: AddTaskProps) {

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        className="border rounded p-2 flex-grow mr-2 "
        placeholder="New task description"
      />
      <Add
        onClick={handleCreateMainTask}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        fontSize="large"
      />
    </div>
  );
}

export default AddTask;