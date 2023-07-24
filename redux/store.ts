import { configureStore } from "@reduxjs/toolkit";
import { supabaseApi } from "./hooks";
import theme from "./themeSlice";

export const store = configureStore({
    reducer: {
        theme,
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(supabaseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;