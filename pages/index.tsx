
import React from "react";
import { useGetJokesQuery } from "../redux/hooks";
import DataGrid from "../components/table";
import { supabase } from "../utility/supabaseClient";

export default function Jokes() {
  // const { data, isLoading, error } = useGetJokesQuery();
  const [data, setData] = React.useState<any>()
  const [error, setError] = React.useState<any>()
  const [isLoading, setIsLoading] = React.useState(true)

  const fetch = async () => {
    const { data, error } = await supabase
      .from("jokes")
      .select('*')
      .order('likes', { ascending: false})

    setData(data);
    setError(error);
    setIsLoading(false)

  }

  React.useEffect(() => {
    fetch();
  }, [data]);


  return (
    <DataGrid
      rows={data ?? []}
      loading={isLoading}
      error={error}
    />
  );
}

