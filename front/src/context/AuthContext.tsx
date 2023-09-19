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
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}