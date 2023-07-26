import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../utility/supabaseClient";

const supabaseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Jokes"],
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
    providesTags: ["Jokes"],
    }),
  }),
});

export const { useGetJokesQuery } = supabaseApi;
export { supabaseApi };
