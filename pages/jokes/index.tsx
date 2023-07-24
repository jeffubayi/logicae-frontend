import Head from "next/head";
import React from "react";

import { useGetJokesQuery } from "../../redux/hooks";
import DataGrid from "../../components/table";

export default function Jokes() {
  const { data, isLoading, error } = useGetJokesQuery({
    pollingInterval: 3000,
  });

  return (
    <React.Fragment>
      <Head>
        <title>Jokes | Logicea </title>
      </Head>
      <DataGrid
        rows={data ?? []}
        loading={isLoading}
        error={error}
      />
    </React.Fragment>
  );
}