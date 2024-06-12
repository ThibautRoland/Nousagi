import { useContext, useEffect, useState } from 'react';
import '../styles/globals.css'
import { AuthContext } from '@/context/authContext';
import { userAuth } from '@/interface/login';
import { removeUserAuthInCookie, saveUserAuthInCookie } from '@/api/cookies';
import { WebsocketProvider, socket } from '@/context/WebsocketContext';


interface Props {
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }:Props) {
  const [userAuth, setUserAuth] = useState<userAuth | null>(null);
  // const authContext = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) {
      // console.log('from useEffect in _app: userAuth -> ', userAuth)
      saveUserAuthInCookie(userAuth)
    }
  }, [userAuth]);

  return (
    <AuthContext.Provider value={{
      userAuth,
      setUserAuth
    }}>
      <WebsocketProvider value={socket}>
        <Component {...pageProps} />
      </WebsocketProvider>
    </AuthContext.Provider>
  )
}