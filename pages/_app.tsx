import '../styles/globals.css';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { supabase } from "../utility/supabaseClient";
import { store } from "../redux/store";
import Layout from '../components/layout';

interface MyAppProps extends AppProps {
  initialSession: Session;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps, initialSession, } = props;
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>("");

  useEffect(() => {
    const access_token = localStorage.getItem('sb-aaepbxpivppmvuaemajn-auth-token')
    setToken(access_token)
    if (access_token) {
      router.push("/jokes")
    } else {
      router.push("/signin")
    }
  }, [token])

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={initialSession}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </SessionContextProvider>
    </Provider>
  )
}
export default MyApp
