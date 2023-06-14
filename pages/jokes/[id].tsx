import Head from "next/head";
import React, { useEffect } from "react";
import { Tooltip, DialogContent, Container } from "@mui/material";
import { useRouter } from "next/router";
import { Slide, AppBar, Grid, Dialog, Button, Toolbar, IconButton, DialogActions, Typography } from '@mui/material';
import { TextField } from "formik-mui";
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionProps } from '@mui/material/transitions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { JokesValues } from "../../types";
import {
    useDeleteJokeMutation,
    useUpdateJokeMutation,
    useCreateJokeMutation,
} from "../../redux/hooks";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function EditDialog() {
    const router = useRouter();
    const [deleteJoke] = useDeleteJokeMutation();
    const [updateJoke] = useUpdateJokeMutation();
    const [createJoke] = useCreateJokeMutation();
    const [open, setOpen] = React.useState(true);
    const { id, method, Title, Author, Body, Views, CreatedAt } = router.query;
    //initial form values
    const initialValues: JokesValues = {
        Title,
        Body,
        Author,
        Views,
        CreatedAt: CreatedAt || new Date(),
    }
    //form validation
    const validationSchema = Yup.object({
        Title: Yup.string().required('Required'),
        Body: Yup.string().required('Required'),
        Author: Yup.string().email('Invalid email').required('Required'),
        Views: Yup.number().required('Required'),
    });

    //go back logic
    const handleClose = () => {
        router.back();
        setOpen(false);
    };

    //delete joke
    const handleDelete = () => {
        deleteJoke(id)
            .unwrap()
            .then(() => {
                handleClose()
                toast.success(`Joke ${Title} successfully deleted`)
            })
            .catch((error) => {
                toast.error(`Joke ${Title} failed to delete`)
                console.log(error)
            });
    };


    //create or edit joke based on method
    const handleSubmit = async (
        values: JokesValues,
    ) => {
        if (method === "Edit" && id != null) {
            await updateJoke({ id, values })
                .unwrap()
                .then(() => {
                    handleClose()
                    toast.success(`Joke ${id} successfully edited`)
                })
                .catch((error) => {
                    toast.error(`Joke ${id} failed to edit`)
                    console.log(error)
                });
        } else {
            await createJoke({
                ...values,
                id: Math.floor(Math.random() * 100),
            })
                .unwrap()
                .then(() => {
                    handleClose()
                    toast.success(` ${values.Title} successfully added`)
                })
                .catch((error) => {
                    toast.error(`Error creating joke`)
                    console.log(error)
                });
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Head>
                <title>Jokes | {method}</title>
            </Head>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar
                    position='relative'
                    color="inherit" elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar>
                        <Tooltip title="Go Back">
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {`${method} Joke`}
                        </Typography>
                        {method === "Edit" &&
                            <Button
                                variant="contained"
                                color="warning" size="small"
                                onClick={handleDelete}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>}
                    </Toolbar>
                </AppBar>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <Container
                                disableGutters
                                maxWidth="sm"
                                component="main"
                                sx={{ borderRadius: "0.5rem", bgcolor: 'background.paper' }}
                            >
                                <DialogContent>
                                    <Grid container
                                        rowSpacing={2}
                                        columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="Title"
                                                label="Title"
                                                type="text"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="Author"
                                                label="Author"
                                                type="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="Body"
                                                type="text"
                                                multiline
                                                rows={4}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4.5}>
                                            <Field
                                                component={DesktopDatePicker}
                                                label="Created At"
                                                name="CreatedAt"
                                                type='date'
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={7.5} >
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="Views"
                                                label="Views"
                                                type="number"
                                                InputProps={{ inputProps: { min: 0, max: 100 } }} />
                                        </Grid>

                                    </Grid>
                                </DialogContent>
                                <DialogActions sx={{ px: 2, py: 3 }} >
                                    <Button
                                        autoFocus
                                        fullWidth
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{ color: `#fff` }}
                                        variant="contained"
                                    >
                                        {`${method} joke`}
                                    </Button>
                                    <Button
                                        autoFocus
                                        fullWidth
                                        onClick={handleClose}
                                        variant="outlined"
                                    >
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </LocalizationProvider >
    );
}

