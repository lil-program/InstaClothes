import { Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import NoMatch from './routes/NoMatch';
import { Home } from './pages/Home';
import { Login } from './pages/Login';



function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;