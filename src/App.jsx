import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext'; // Import Provider
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskFormPage from './pages/TaskFormPage';

function App() {
  return (
    <TaskProvider> {/* WRAP EVERYTHING IN PROVIDER */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<TaskFormPage />} />
            <Route path="/edit/:id" element={<TaskFormPage />} />
          </Routes>
        </Layout>
      </Router>
    </TaskProvider>
  );
}

export default App;