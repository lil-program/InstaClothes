import { auth } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return <Navigate to="/login" />;
  }else{
    return (
      <div>
        <h1>ホーム</h1>
        <p>ログイン中のユーザー: {user.email}</p>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;