import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { DialogTitle ,Tooltip, DialogContent, MenuItem, Container, Slide, AppBar, Grid, Dialog, Button, Toolbar, IconButton, DialogActions, Typography } from '@mui/material';
import { TextField } from "formik-mui";
import toast from 'react-hot-toast';
import { JokesValues } from "../types";
import { supabase } from "../utility/supabaseClient";
import { useUser } from '@supabase/auth-helpers-react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
    const user = useUser();
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function ActionDialog(props: { open: any; handleClose: any; data: any; method: any }) {
    const { open, handleClose, data, method } = props
    const user = useUser();
    const {id, Category, Body } = data

    const validationSchema = Yup.object({
        Category: Yup.string().required('Required'),
        Body: Yup.string().required('Required'),
    });

    const handleSubmit = async (
        values: JokesValues,
    ) => {
        if (method === "Edit" && id != null ) {
            const { error } = await supabase
                .from('jokes')
                .upsert({ id, ...values })
                .select()

            if (error) {
                toast.error(`Error updating ${values.Category}`)
                console.log(error)
            } else {
                handleClose()
                toast.success(`Success updating ${values.Category}`)
            }

        } else {
            const { error } = await supabase
                .from('jokes')
                .insert({
                    ...values,
                    id: Math.floor(Math.random() * 100),
                    created_at: new Date(),
                    likes: 0
                })

            if (error) {
                toast.error(`Error creating ${values.Category}`)
                console.log(error)
            } else {
                handleClose()
                toast.success(`Success creating a ${values.Category}`)
            }
        }
    };

    return (
        <div>
            <BootstrapDialog
                maxWidth="xl"
                open={open}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`${method} Joke`}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{ Category, Body }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    {({
                        isSubmitting,
                    }) => (
                        <Form>
                            <DialogContent>
                                <Grid container
                                    rowSpacing={2}
                                    columnSpacing={{ xs: 2, sm: 3, md: 5 }}
                                >
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            select
                                            name="Category"
                                            type="search"
                                            label="Select Category"
                                        >
                                            <MenuItem value="Joke">
                                                Joke
                                            </MenuItem>
                                            <MenuItem value="Riddle">
                                                Riddle
                                            </MenuItem>
                                            <MenuItem value="Pun">
                                                Pun
                                            </MenuItem>
                                        </Field>
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

                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ px: 2, py: 3 }} >
                                <Button
                                    autoFocus
                                    fullWidth
                                    type="submit"
                                    disabled={user?.id ? isSubmitting : !user?.id}
                                    sx={{ color: `#fff` }}
                                    variant="contained"
                                >
                                    {`${method}`}
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
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </div>
    );
}