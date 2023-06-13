import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JokesState} from "../types";

export const retoolApi = createApi({
  reducerPath: "retoolApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://retoolapi.dev/zu9TVE" }),
  tagTypes: ["Jokes"],
  endpoints: (builder) => ({
    getJokes: builder.query<JokesState[], void>({
      query: () => "jokes",
      providesTags: ["Jokes"],
    }),
    getJokeById: builder.query<JokesState[], number | string | string[] | undefined>({
      query: (id) => `jokes/${id}`,
      providesTags: ["Jokes"],
    }),
    createJoke: builder.mutation<void, Partial<JokesState>>({
      query: (newJoke) => ({
        url: "jokes",
        method: 'POST',
        body: newJoke,
      }),
    }),
    deleteJoke: builder.mutation<JokesState[], number | string | string[] | undefined>({
      query: (id) => ({
        url: `jokes/${id}`,
        method: 'DELETE',
      }),
    }),
    updateJoke: builder.mutation<JokesState[], { id: number | string | string[] | undefined; joke: Partial<JokesState> }>({
      query: ({ id, joke }) => ({
        url: `jokes/${id}`,
        method: 'PUT',
        body: joke ,
      }),
    }),
  }),
});

export const { 
  useGetJokesQuery, 
  useDeleteJokeMutation,
  useUpdateJokeMutation,
  useCreateJokeMutation,
  useGetJokeByIdQuery
 } = retoolApi;
