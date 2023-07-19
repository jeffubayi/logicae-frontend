import Head from "next/head";
import React from "react";

import { useGetJokesQuery } from "../redux/hooks";
import { Avatar, Typography } from "@mui/material";

export default function Jokes() {

    return (
        <React.Fragment>
            <Head>
                <title>Profile | Logicea </title>
            </Head>
            <Avatar
                sx={{ m: 1, height: "4rem", width: "4rem" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq56ZEZEoAO3LQM58USPv73nePUxfRscHvsZyj9pmzdA&s"
            >
            </Avatar>
            <Typography component="h1" variant="h5">
                setup profile
            </Typography>
        </React.Fragment>
    );
}