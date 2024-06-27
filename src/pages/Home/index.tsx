import TaskList from "./TaskList";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-slate-400 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-40">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Tasks</h1>
          <TaskList />
        </div>
      </div>
    </>
  );
}
