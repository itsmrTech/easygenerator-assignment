// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/signup.page';
import SigninPage from './pages/signin.page';
import AppPage from './pages/app.page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;
