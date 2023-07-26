import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { Tooltip, DialogContent, Container, Slide, AppBar, Grid, Dialog, Button, Toolbar, IconButton, DialogActions, Typography } from '@mui/material';
import { TextField } from "formik-mui";
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionProps } from '@mui/material/transitions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { JokesValues } from "../../types";
import { supabase } from "../../utility/supabaseClient";


export default function EditDialog() {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const { id, method, Category, Body, likes } = router.query;
    //initial form values
    const initialValues: JokesValues = {
        Category, Body, likes,
    }
    //form validation
    const validationSchema = Yup.object({
        Category: Yup.string().required('Required'),
        Body: Yup.string().required('Required'),
        likes: Yup.number().required('Required'),
    });

    //go back logic
    const handleClose = () => {
        router.push("/jokes");
        setOpen(false);
    };

    //delete joke
    const handleDelete = async () => {
        const { error } = await supabase
            .from('jokes')
            .delete()
            .eq('id', 1)

        if (error) {
            toast.error(`Joke ${Category} failed to delete`)
            console.log(error)
        } else {
            handleClose()
            toast.success(`Joke ${Category} successfully deleted`)
        }

    };


    //create or edit joke based on method
    const handleSubmit = async (
        values: JokesValues,
    ) => {
        console.log(`VAL`, values)
        if (method === "Edit" && id != null) {
            const { error } = await supabase
                .from('jokes')
                .upsert({ id, ...values })
                .select()

            if (error) {
                toast.error(`Joke ${id} failed to edit`)
                console.log(error)
            } else {
                handleClose()
                toast.success(`Joke ${id} successfully edited`)
            }

        } else {
            const { error } = await supabase
                .from('jokes')
                .insert({
                    ...values,
                    id: Math.floor(Math.random() * 100),
                    created_at: new Date(),
                })

            if (error) {
                toast.error(`Error creating joke`)
                console.log(error)
            } else {
                handleClose()
                toast.success(` ${values.Category} successfully added`)
            }
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
                                                name="Category"
                                                label="Category"
                                                type="text"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12} >
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="Author"
                                                label="Author"
                                                type="email"
                                            />
                                        </Grid> */}
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
                                        {/* <Grid item xs={12} md={4.5}>
                                            <Field
                                                component={DesktopDatePicker}
                                                label="Created At"
                                                name="created_at"
                                                type='date'
                                            />
                                        </Grid> */}

                                        <Grid item xs={12} md={7.5} >
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                name="likes"
                                                label="Likes"
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


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

