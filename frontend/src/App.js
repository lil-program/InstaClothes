import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
