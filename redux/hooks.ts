import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JokesState,JokesValues} from "../types";

export const retoolApi = createApi({
  reducerPath: "retoolApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://retoolapi.dev/zu9TVE" }),
  tagTypes: ["Jokes"],
  endpoints: (builder) => ({
    getJokes: builder.query<JokesState[], void>({
      query: () => "jokes",
      providesTags: ["Jokes"],
    }),
    createJoke: builder.mutation<void, Partial<JokesValues>>({
      query: (newJoke) => ({
        url: "jokes",
        method: 'POST',
        body: newJoke,
      }),
      invalidatesTags: ["Jokes"],
    }),
    deleteJoke: builder.mutation<JokesState[], number | string | string[] | undefined>({
      query: (id) => ({
        url: `jokes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Jokes"],
    }),
    updateJoke: builder.mutation<JokesState[], { id: number | string | string[] | undefined; values: Partial<JokesValues> }>({
      query: ({ id, values }) => ({
        url: `jokes/${id}`,
        method: 'PUT',
        body: values ,
      }),
      invalidatesTags: ["Jokes"],
    }),
  }),
});

export const { 
  useGetJokesQuery, 
  useDeleteJokeMutation,
  useUpdateJokeMutation,
  useCreateJokeMutation,
 } = retoolApi;
