import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from '@supabase/auth-helpers-react'
import { useLocalStorage } from 'react-use';

import { useGetJokesQuery } from "../redux/hooks";
import JokesDataGrid from "../components/table";

export default function Jokes() {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = useGetJokesQuery();
  const [token, setToken] = useLocalStorage<string>("access_token", "")

  useEffect(() => {
    setToken(session?.access_token)
    !token && router.push("/signin")
  }, [session,token])

  if (error) {
    return <div>Error: Unable to fetch jokes</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home | Logicea </title>
      </Head>
      <JokesDataGrid
        rows={data??[]}
        loading={isLoading}
      />
    </React.Fragment>
  );
}