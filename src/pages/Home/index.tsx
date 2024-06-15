import TaskList from './TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Tasks</h1>
        <TaskList />
      </div>
    </div>
  );
}
