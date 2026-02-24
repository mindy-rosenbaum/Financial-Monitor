import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Simulator from './pages/Simulator';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar זמני כדי שנוכל לנווט */}
        <nav className="p-4 bg-white shadow-md flex gap-4">
          <Link to="/add" className="text-blue-600 font-bold">Simulator</Link>
          <Link to="/monitor" className="text-blue-600 font-bold">Monitor</Link>
        </nav>

        <div className="p-8">
          <Routes>
            <Route path="/add" element={<Simulator />} />
            <Route path="/monitor" element={<Dashboard />} />
            <Route path="/" element={<h1 className="text-2xl">Welcome - Choose a page above</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
