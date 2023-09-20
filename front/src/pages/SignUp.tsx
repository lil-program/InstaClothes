import { useRef } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../FirebaseConfig";

const SignUp = () => {
  // アカウント登録は、nameをfactoryに渡す

  const emailRef = useRef(null);
  const emailPassword = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value);
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" ref={emailRef} />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            ref={emailPassword}
          />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

