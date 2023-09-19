import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { User } from '@firebase/auth';
import { OpenAPI } from '../api_clients';

const AuthContext = createContext<{ user: User | null }>({ user: null});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      user.getIdToken().then(token => {
        OpenAPI.TOKEN = token})
        // OpenAPI.TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlscHJvZ3JhbSIsImF1ZCI6ImxpbHByb2dyYW0iLCJhdXRoX3RpbWUiOjE2OTUxMjQzODQsInVzZXJfaWQiOiI4SUlwMHJzR3AwVHFTektvM1RvSVFWcXJJTkUzIiwic3ViIjoiOElJcDByc0dwMFRxU3pLbzNUb0lRVnFySU5FMyIsImlhdCI6MTY5NTEyNDM4NCwiZXhwIjoxNjk1MTI3OTg0LCJlbWFpbCI6InRlc3QxQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3QxQGV4YW1wbGUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.d3Np_oYXDdzTHgrgwuKqRuA_I1qWDS_zzDUQ1JXdpGLnCSlU_02MwTBnnDmoa2yhoyD80Cv_6ma7qBseRRGsotTIYnudIuBtdgLoSlkKeO5FN90dDFTLZ8bOA_0NQ_CykHzQEJvztL_ZyDFAdaorpfQHQQxWdF20K9Z9zFDJ9wuROrsrHxtPT-4mtNzXmVQpJrbCtns0CEcylyGngNhE2HXnFsF7ha3qXaH2V5ZD6L0BFuriwWxpQdVVjY9HY7rV-upTvXuDbGglGMWcHjmHdMr3sI1Fc3L37mA-ftaAJp66tlB5zPbmj5PQHRleVtjJvjzj_sJGUezCtJsBJUfCbw"})
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}