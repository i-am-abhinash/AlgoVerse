import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import WorldMapPage from './pages/WorldMapPage';
import RealmPage from './pages/RealmPage';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/world" element={<WorldMapPage />} />
          <Route path="/realm/:slug" element={<RealmPage />} />
          <Route path="/challenges" element={<div className="p-8 text-white">Challenges Arena (Coming Soon)</div>} />
          <Route path="/profile" element={<div className="p-8 text-white">Player Profile (Coming Soon)</div>} />
        </Route>

        <Route path="/lesson/:id" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
