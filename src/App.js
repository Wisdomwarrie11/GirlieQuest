import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AvatarSetup from './pages/AvatarSetup';
import LevelSelect from './pages/LevelSelect';
import QuizPage from './pages/QuizPage'; // import the QuizPage component
import SoundManager from './components/SoundManager';
import Navbar from './components/Navbar';
import MenstrualBot from './pages/MenstrualBot';
import IntroPage from './pages/IntroPage';

function App() {
  return (
    <div style={{backgroundColor: 'rgb(9, 1, 40)', height: '100%'}}>
   
      <Router>
      <Navbar />
        <Routes>
        <Route path="/" element={<IntroPage />} />
          <Route path="/avatarsetup" element={<AvatarSetup />} />
          <Route path="/periodcal" element={<MenstrualBot />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/quiz/:levelId" element={<QuizPage />} /> {/* Add this route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
