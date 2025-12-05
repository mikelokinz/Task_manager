import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Animation Library
import { Edit, Trash2, CheckCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const TASKS_PER_PAGE = 5;

const Home = () => {
  const { tasks, deleteTask } = useTasks();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPriority, setFilterPriority] = useState('All');

  // --- Logic: Filter & Search ---
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // --- Logic: Pagination ---
  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Task</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentTasks.length > 0 ? (
                currentTasks.map((task) => (
                  <motion.tr 
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white">{task.title}</div>
                      <div className="text-sm text-slate-400 truncate max-w-xs">{task.description}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{task.dueDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <Link to={`/edit/${task.id}`} className="inline-block p-2 text-blue-400 hover:bg-blue-500/10 rounded-full">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => deleteTask(task.id)} 
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No tasks found. Time to relax or create a new one!
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 bg-slate-800 rounded-lg disabled:opacity-50 hover:bg-slate-700"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 py-2 bg-slate-800 rounded-lg">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 bg-slate-800 rounded-lg disabled:opacity-50 hover:bg-slate-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;