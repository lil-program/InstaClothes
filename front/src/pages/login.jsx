import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { auth } from "../FirebaseConfig";


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
            <button>ログイン</button>
            </div>
            <div>
            ユーザ登録は<Link to={'/signup'}>こちら</Link>から
            </div>
        </form>
        </div>
    );
};


export { Login };