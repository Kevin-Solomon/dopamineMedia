import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage/LandingPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
