import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../utility/supabaseClient";

const supabaseApi = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getJokes: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("jokes")
          .select('*')

        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
  }),
});

export const { useGetJokesQuery } = supabaseApi;
export { supabaseApi };
