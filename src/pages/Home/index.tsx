import TaskList from './TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-40">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Tasks</h1>
        <TaskList />
      </div>
    </div>
  );
}
