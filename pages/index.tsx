import Head from "next/head";
import React from "react";

import { useGetJokesQuery } from "../redux/hooks";
import JokesDataGrid from "../components/table";

export default function Jokes() {
  const { data, isLoading, error } = useGetJokesQuery();

  if (error) {
    return <div>Error: Unable to fetch jokes</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home | Logicea </title>
      </Head>
      <JokesDataGrid
        rows={data ?? []}
        loading={isLoading}
      />
    </React.Fragment>
  );
}