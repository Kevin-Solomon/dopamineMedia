import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage/LandingPage';
import Home from './pages/private/Home/Home';
function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LandingPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
