import Head from "next/head";
import React from "react";
import { Tooltip, DialogContent, Container } from "@mui/material";
import { useRouter } from "next/router";
import { TextField, Slide, AppBar, Grid, Dialog, Button, Toolbar, IconButton, DialogActions, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionProps } from '@mui/material/transitions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    useDeleteJokeMutation,
    useUpdateJokeMutation,
    useCreateJokeMutation,
    useGetJokeByIdQuery
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
    const { id, method } = router.query;
    const [deleteJoke] = useDeleteJokeMutation();
    const [updateJoke] = useUpdateJokeMutation();
    const [createJoke] = useCreateJokeMutation();
    const { data } = useGetJokeByIdQuery(id);
    const values = data ? data : []
    // const {Title,Author,CreatedAt,Views} = values
    const [open, setOpen] = React.useState(true);
    const [joke, setJoke] = React.useState({
        id: Math.floor(Math.random() * 100),
        Title: "",
        Body: "",
        Author: "",
        CreatedAt: new Date(),
        Views: 0
    });
    console.log(`jokes`, joke)
    const handleClose = () => {
        router.back();
        setOpen(false);
    };
    const handleDelete = () => {
        deleteJoke(id)
            .unwrap()
            .then(() => {
                setOpen(false);
                router.push('/');
                toast.success(`Joke ${id} successfully deleted`)
            })
            .catch((error) => {
                toast.error(`Joke ${id} failed to delete`)
                console.log(error)
            });
    };

    const submitJoke = () => {
        if (method === "Edit") {
            updateJoke({
                joke,
                id: id
            })
                .unwrap()
                .then(() => {
                    setOpen(false);
                    router.push('/');
                    toast.success(`Joke ${id} successfully deleted`)
                })
                .catch((error) => {
                    toast.error(`Joke ${id} failed to delete`)
                    console.log(error)
                });
        } else {
            createJoke(joke)
                .unwrap()
                .then(() => {
                    setOpen(false);
                    router.push('/');
                    toast.success(`Joke ${id} successfully added`)
                })
                .catch((error) => {
                    toast.error(`Joke ${id} failed to add`)
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
                <AppBar position='relative' color="inherit" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
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
                <Container
                    disableGutters
                    maxWidth="sm"
                    component="main"
                    sx={{ borderRadius: "0.5rem", bgcolor: 'background.paper' }}>
                    <DialogContent>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    type="text"
                                    value={joke.Title}
                                    onChange={(e) =>
                                        setJoke({ ...joke, Title: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField fullWidth label="Author" type="email"
                                    value={joke.Title}
                                    onChange={(e) =>
                                        setJoke({ ...joke, Title: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField fullWidth label="Body" type="text" multiline
                                    rows={4}
                                    value={joke.Body}
                                    onChange={(e) =>
                                        setJoke({ ...joke, Body: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} md={4.5}>
                                <DatePicker
                                    label="Created At"
                                    // value={joke.CreatedAt}
                                    onChange={(e) =>
                                        setJoke({ ...joke, CreatedAt: new Date() })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={7.5} >
                                <TextField
                                    value={joke.Views}
                                    onChange={(e) =>
                                        setJoke({ ...joke, Views: 0 })
                                    }
                                    label="Views" fullWidth type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} />
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ px: 15, py: 3 }}>
                        <Button
                            autoFocus
                            fullWidth
                            onClick={submitJoke}
                            sx={{ color: `#fff` }}
                            variant="contained"
                        >
                            {`${method} joke`} 
                        </Button>
                    </DialogActions>
                </Container>
            </Dialog>
        </LocalizationProvider >
    );
}
