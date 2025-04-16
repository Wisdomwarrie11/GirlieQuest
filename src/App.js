import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AvatarSetup from './pages/AvatarSetup';
import LevelSelect from './pages/LevelSelect';
import QuizPage from './pages/QuizPage'; // import the QuizPage component
import SoundManager from './components/SoundManager';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{backgroundColor: 'rgb(220, 175, 235)', height: '100%'}}>
   
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<AvatarSetup />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/quiz/:levelId" element={<QuizPage />} /> {/* Add this route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
