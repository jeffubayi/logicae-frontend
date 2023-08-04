import Head from 'next/head';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box, Divider, Paper, Typography, Avatar, Button, Checkbox, FormControlLabel, Link } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router';
import toast from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from "formik-mui";
import GoogleIcon from '@mui/icons-material/Google';

export default function SignIn() {
    const supabase = useSupabaseClient()
    const theme = useTheme()
    const [signUp, setSignUp] = React.useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const initialValues: any = {
        email: "",
        password: "",
    }

    const handleSignUp = async (values: any) => {
        const {
            email,
            password,
        } = values
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: '/auth/success',
            },
        });

        if (error) {
            // handle the error however you like
            toast.error(` ${error} `)
            return;
        }

        // if there is a session it means that we do not need to verify the email beforehand
        if (session) {
            router.push('/');
        } else {
            toast.success(`Successful signed up with ${email}`)
            router.push('/verify');
        }
    };

    const handleSignIn = async (values: any) => {
        const {
            email,
            password,
        } = values
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(` ${error} `)
            return;
        }

        if (data) {
            toast.success(` logged in `)
            router.push('/');
        }
    };

    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })


    };


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
                        {signUp ? `Sign Up` : `Sign In`}
                    </Typography>
                </Box>


                {/* <Auth
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
                    /> */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={signUp ? handleSignUp : handleSignIn}
                    validationSchema={validationSchema}>
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <Box sx={{ mx: 4 }}>
                                <Button
                                    startIcon={<GoogleIcon />}
                                    fullWidth
                                    variant="outlined"
                                    color='secondary'
                                    onClick={handleGoogleLogin}

                                >
                                    {` Google`}
                                </Button>
                                <Divider orientation="horizontal" flexItem sx={{ my: 4 }}>
                                Or with email and password
                                </Divider>
                                <Grid container
                                    rowSpacing={2}
                                    columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                >
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="email"
                                            label="Email Address"
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {signUp ? `Sign Up` : `Sign In`}
                                </Button>

                                <Grid container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center" spacing={0.5}>

                                    <Grid item xs={12} onClick={() => setSignUp(!signUp)}>
                                        <Link href="#" variant="body2">
                                            {signUp ? "Have an account? Log in now" : "Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="#" variant="body2">
                                            Send Magic Link
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="#" variant="body2">
                                            Forgot Password
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={false} sm={4} md={8}
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