import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../context/AuthContext';

const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      // const user = userCredential.user;
      // console.log('User created:', user);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  // const handleChangeEmail = (event) => {
  //   setEmail(event.currentTarget.value);
  // };
  // const handleChangePassword = (event) => {
  //   setPassword(event.currentTarget.value);
  // };

  return (
    <div>
      <h1>ユーザ登録</h1>
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
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;