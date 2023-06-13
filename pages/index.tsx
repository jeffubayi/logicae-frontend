import Head from "next/head";
import React, { useMemo, useEffect } from "react";
import { GridValueGetterParams, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useSession } from '@supabase/auth-helpers-react'
import { useLocalStorage } from 'react-use';

import { useGetJokesQuery } from "../redux/hooks";
import DataGrid from "../components/table";
import { renderViewsComponent } from "../components/viewsChip";
import { JokesState } from "../types";
import { timeConverter } from "../utility";

export default function Jokes() {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = useGetJokesQuery();
  const [token, setToken] = useLocalStorage<string>("access_token", "")
  const rows = data || [];
  const columns = useMemo(
    () => [
      { field: "Title", flex: 1, sortable: false },
      { field: "Author", flex: 1, sortable: false },
      {
        field: "CreatedAt",
        headerName: "Created Date",
        sortable: true,
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => {
          return timeConverter(params.row.CreatedAt)
        },
      },
      {
        field: "Views",
        sortable: true,
        type: 'number',
        renderCell: (params: GridRenderCellParams<JokesState>) => (
          renderViewsComponent(params.row.Views)
        ),
      },
    ],
    []
  );

  //set access token to local storage
  useEffect(() => {
    setToken(session?.access_token)
    !token && router.push("/signin")
  }, [session])


  if (error) {
    return <div>Error: Unable to fetch jokes</div>;
  }

  return (
    <div>
      <Head>
        <title>Home | Logicea </title>
      </Head>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
      />
    </div>
  );
}