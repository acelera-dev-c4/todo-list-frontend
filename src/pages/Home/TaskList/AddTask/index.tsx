import React from 'react';

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
        className="border rounded p-2 flex-grow mr-2"
        placeholder="New task description"
      />
      <button
        onClick={handleCreateMainTask}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;