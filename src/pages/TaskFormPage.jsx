import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useForm } from '../hooks/useForm';
import { motion } from 'framer-motion';

const TaskFormPage = () => {
  const { addTask, updateTask, tasks } = useTasks();
  const navigate = useNavigate();
  const { id } = useParams(); // If ID exists, we are in EDIT mode
  const isEditMode = !!id;

  // Validation Logic
  const validate = (values) => {
    let errors = {};
    if (!values.title) errors.title = "Title is required";
    if (values.title.length < 3) errors.title = "Title must be at least 3 chars";
    if (!values.dueDate) errors.dueDate = "Due Date is required";
    return errors;
  };

  // Initial State
  const initialValues = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Todo'
  };

  const submitForm = () => {
    if (isEditMode) {
      updateTask(id, values);
    } else {
      addTask(values);
    }
    navigate('/');
  };

  const { handleChange, handleSubmit, values, setValues, errors } = useForm(initialValues, validate, submitForm);

  // If Edit Mode, load data into form
  useEffect(() => {
    if (isEditMode) {
      const taskToEdit = tasks.find(t => t.id === id);
      if (taskToEdit) setValues(taskToEdit);
    }
  }, [id, tasks, isEditMode]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-slate-400 text-sm mb-1">Task Title</label>
          <input 
            type="text" name="title"
            className={`w-full bg-slate-900 border ${errors.title ? 'border-red-500' : 'border-slate-600'} rounded-lg p-3 text-white focus:outline-none focus:border-purple-500`}
            value={values.title} onChange={handleChange}
          />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-slate-400 text-sm mb-1">Description</label>
          <textarea 
            name="description" rows="3"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
            value={values.description} onChange={handleChange}
          />
        </div>

        {/* Grid for Priority & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Priority</label>
            <select 
              name="priority"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white"
              value={values.priority} onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-slate-400 text-sm mb-1">Due Date</label>
            <input 
              type="date" name="dueDate"
              className={`w-full bg-slate-900 border ${errors.dueDate ? 'border-red-500' : 'border-slate-600'} rounded-lg p-3 text-white`}
              value={values.dueDate} onChange={handleChange}
            />
            {errors.dueDate && <p className="text-red-400 text-xs mt-1">{errors.dueDate}</p>}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4"
        >
          {isEditMode ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </motion.div>
  );
};

export default TaskFormPage;