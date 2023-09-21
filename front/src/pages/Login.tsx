import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { auth } from "../FirebaseConfig";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      // アクセストークンを取得
      const token = await user.getIdToken();
      // const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlscHJvZ3JhbSIsImF1ZCI6ImxpbHByb2dyYW0iLCJhdXRoX3RpbWUiOjE2OTUxMDg1OTgsInVzZXJfaWQiOiJMaFdLRDlFWTl6ZGQ2aW1keHZMcEpRbXlVOEEyIiwic3ViIjoiTGhXS0Q5RVk5emRkNmltZHh2THBKUW15VThBMiIsImlhdCI6MTY5NTEyNjI2NiwiZXhwIjoxNjk1MTI5ODY2LCJlbWFpbCI6ImthbmVraS5raW5nLjE0OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsia2FuZWtpLmtpbmcuMTQ5M0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.hQBpHm9tCaSYmhrY5O39dq3Z057AY9UiXrCo7R_2OaXDrwTGxt9HssrfWAufG89vK2Ko1jLaBrxRget1eRPUAuluvN6cz01i62u9RS8XvVegOaOKju8maiPAwrEfNTXq8cNI26l0uv5z71MmvREwYZIJIAZQFzHyN1PZ4Gs3Ju9rDOdSxhatbV8YmqhxSrYTLhKVl1mm6jJ0CSf2YUv0IRcRVKxJyvxUkx6H54EC8MMj64LJgCrcHkNrkTZKtUYANxt-JgDNxnOKXbmVDKmop1tFI3sl1cuGE4sfwAFfZkVrj4-HAi7onNcTxhPqIElaGzqDOpWST8G1pD74xCDiFw"
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleGohome = () => {
    if (user) {
      navigate("/home", { state: { id: 1 } });
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    }
  });

  if (user) {
    return <Navigate replace to="/home" />;
  }
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
          ユーザ登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export { Login };
