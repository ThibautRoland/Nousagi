import { useEffect, useState } from 'react';
import '../styles/globals.css'
import { AuthContext } from '@/context/authContext';
import { userAuth } from '@/interface/login';
import { removeUserAuthInCookie, saveUserAuthInCookie } from '@/api/cookies';

interface Props {
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }:Props) {
  const [userAuth, setUserAuth] = useState<userAuth | null>(null);

  useEffect(() => {
    if (userAuth) {
      saveUserAuthInCookie(userAuth)
    } else {
      removeUserAuthInCookie();
    }
  }, [userAuth]);

  return (
    <AuthContext.Provider value={{
      userAuth,
      setUserAuth
    }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}