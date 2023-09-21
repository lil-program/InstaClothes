import { useRef } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { UsersService } from "../api_clients";
import { auth } from "../FirebaseConfig";
import { useAuthContext } from "../context/AuthContext";

import { Navigate } from 'react-router-dom';

const SignUp = () => {
  // アカウント登録は、nameをfactoryに渡す

  const emailRef = useRef(null);
  const emailPassword = useRef(null);
  const nameRef = useRef(null);
  const { user } = useAuthContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);

    const user = userCredential.user;

    const requestBody = {"name": event.target.elements.name}
    UsersService.createUserApiV1UsersCreatePost(requestBody)
  };
  if (user){
    return <Navigate replace to="/home" />
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
          <label>名前</label>
          <input name="name" type="name" placeholder="name" ref={nameRef}></input>
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

