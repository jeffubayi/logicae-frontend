import Head from "next/head";
import React from "react";
import { Button ,Typography,Container} from '@mui/material';
import { useRouter } from "next/router";

import { useGetJokesQuery } from "../redux/hooks";
import JokesDataGrid from "../components/table";

export default function Jokes() {
  const router = useRouter();
  const { data, isLoading, error } = useGetJokesQuery({
    pollingInterval: 3000,
  });

  return (
    <React.Fragment>
      <Head>
        <title>Home | Logicea </title>
      </Head>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Logicae Jokes
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Click to Create, View, Edit and Delete Jokes

        </Typography>
        <Button
          sx={{mt:3}}
          hidden
          fullWidth
          variant="contained"
          onClick={() => router.push(`/jokes`)}
        >
          View Jokes
        </Button>
      </Container>
    </React.Fragment>
  );
}