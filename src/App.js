import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage/LandingPage';
import Home from './pages/private/Home/Home';
import Profile from './pages/private/Profile/Profile';
function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LandingPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/:userId" element={<Profile />} />
    </Routes>
  );
}

export default App;
