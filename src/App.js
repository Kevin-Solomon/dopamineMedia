import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage/LandingPage';
import Home from './pages/private/Home/Home';
import Profile from './pages/private/Profile/Profile';
import RequireAuth from './components/RequireAuth/RequireAuth';
function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LandingPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/:userId"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/:userId/bookmarks"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
