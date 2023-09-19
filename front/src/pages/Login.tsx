import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { auth } from '../FirebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';



const Login = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log('User logged in:', user);
        // アクセストークンを取得
        const token = await user.getIdToken();
        console.log('Token:', token);
        } catch (error) {
        console.error("Error signing in:", error);
        }
    };

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const handleGohome = () => {
        if(user) {
            navigate("/home", { state: { id: 1 } });
        };
    }

    // if (!user) {
    //     return <Navigate replace to="/login" />
    // };
    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder="email" />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="password" type="password" placeholder="password" />
                </div>
                <div>
                    <button onClick={handleGohome}>ログイン</button>
                </div>
                <div>
                    ユーザ登録は<Link to={'/signup'}>こちら</Link>から
                </div>
            </form>
        </div>
    );
};


export { Login };