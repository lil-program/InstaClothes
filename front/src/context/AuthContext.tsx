import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { User } from '@firebase/auth';
import { OpenAPI } from '../api_clients';
import { async } from '@firebase/util';

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
    const unsubscribed = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      const token = await user.getIdToken();
      OpenAPI.TOKEN = token
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}