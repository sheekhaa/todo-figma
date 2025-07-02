import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Getstarted from './pages/GetStarted';
import SigninPage from './pages/SigninPage';
import LoginPage from './pages/LoginPage';
import { EuiProvider } from '@elastic/eui';
import LandingPage from './pages/LandingPage';

function App() {
  return (   
    <EuiProvider>   
      <Router>
        <Routes>
          <Route path='/' element={<Getstarted />} />
          <Route path='/signup' element={<SigninPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element = {<LandingPage/>}/>
        </Routes>
      </Router>
    </EuiProvider>
  );
}

export default App;
