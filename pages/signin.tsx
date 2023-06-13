import Head from 'next/head';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box, Paper, Typography, Avatar } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'


export default function SignIn() {
    const supabase = useSupabaseClient()
    const theme = useTheme()

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Head>
                <title>Login | Logicea</title>
            </Head>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} square>
                <Box
                    sx={{
                        my: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ m: 1, height: "4rem", width: "4rem" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq56ZEZEoAO3LQM58USPv73nePUxfRscHvsZyj9pmzdA&s"
                    >
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Logicea
                    </Typography>
                </Box>

                <Box sx={{ mx: 6 }}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#543894',
                                        brandAccent: '#3a2767',
                                    },
                                },
                            },
                        }}
                        magicLink
                        providers={['google']}
                        redirectTo="/"
                        theme={theme.palette.mode}
                    />
                </Box>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    backgroundImage: 'url(https://logicea.com/banner.jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}