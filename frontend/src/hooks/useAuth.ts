import { useState, useEffect } from 'react';
import { getAuthState, JwtPayload } from '@/lib/auth';

type AuthState = {
  isAuth: boolean;
  roleId: string | null;
  user: JwtPayload | null;
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuth: false,
    roleId: null,
    user: null,
  });

  useEffect(() => {
    setAuth(getAuthState());
  }, []);

  return auth;
}
