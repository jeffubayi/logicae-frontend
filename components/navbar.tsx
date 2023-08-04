import * as React from 'react';
import { useRouter } from "next/router";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconButton, Button, AppBar, Avatar, Box, CssBaseline, Toolbar, Tooltip, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSession } from '@supabase/auth-helpers-react'

import { clearUserProfile } from '../redux/userProfileSlice'
import { toggleColorMode } from '../redux/themeSlice';


export default function Navbar() {
    const router = useRouter();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery("(min-width:500px)");
    const supabaseClient = useSupabaseClient()
    const dispatch = useDispatch();
    const session = useSession();

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    const handleLogout = () => {
        router.push(`/signin`)
        supabaseClient.auth.signOut()
        dispatch(clearUserProfile())
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
                        <Avatar
                            sx={{ height: "1.5rem", width: "1.5rem" }}
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEg8NEBAQEA4OFhoXFw0TDxkXEBAaIB0iGRoXFRUdHSgsJB8xGxkXIj0tJSkrLi4yFx8zODMsNyotLisBCgoKDg0OGhAPFSslGB0rLTc3NystNy01Kys3NSstKysrNzI3Ky01LSs1Lis3LS0uKzctKys3Ky03LSsrKysrK//AABEIAGQAZAMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAABwEEAwUGCAL/xAA1EAABAwIBCAoBAwUAAAAAAAABAAIDBBEFBgcSITE1UXMTIjI0QWF0scHCQhRSYiVxgZGh/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAgEQEAAwABBAMBAAAAAAAAAAAAAQIDEQQhMTMSQVEy/9oADAMBAAIRAxEAPwC4oiIC146lrnOjDgXMtpNv1m3FxcLnKj+W2NTUOKvqIXEEMZpM/GRttYIV885vPEJiFhRamH1PSxxy2t0jQ63C4vZbap4nhAiIgIiICIiAiIgIiIBUMzr7wl5bPZXMqG51t4S8tnsurpPYtVVGVZgw9s7QC6KAOAOw2bdcmS+Pw18QmjNjbrxk9aM8CtKv3U/0v0U6zRuIrtEE2MTrjwNrWVK5Ralrfko4WxFgLKwQIiICIiAiIgIiIBUNzrbwl5bPZXIqG51t4S8tnsurpPYtXyplfup/pfopxmj7+OU/4VHr91P9L9FOM0ffxyn/AAr5erQ+pWtatHiMUzpGMeHOhdovb4tPAhbSh+KYvNR4rUywusTLZzT2Xg21ELmzy+fKIXEFZXHGdQK/d1khlERSCIiAiIgFQ3OtvCXls9lciobnW3hLy2ey6uk9i1fKmV+6n+l+inGaPv45T/hUev3U/wBL9FN80nfxyn/Cvl6tCPErW51ta+f8qpA7EahzSHNMws4G4Oxe8zp5TTU+jRQnQMzdJ0oPW0dmi3h/ddJm+yJM5bWVDdGAa2R7DJbY4/xUYRGdZvb7I7KHlZib6SkfVR2049HUdhuQCD/hcuTOUENfEJojYjtxHtRngV53Oni0MdI6kLrzTW0WDWWgG9zw2LoMzLT01UbHR6NovbVe/FZRlE5Tef047cq0FlAiwVEREBERAKhudbeEvLZ7K4lSPOzgE3SuxADShc0NdbbFYWu7yP8AxdHS2iNO61Xt6/dT/S/RTjNJ38cp/wAKjVx/pT/S/RTjNJ38cp/wtM+2WhHiVCxnJNlZWRVUxBghYAIf3uuT1vLYs5ZZWRYbGGN0XVDh1IRqDR+53AJlrldHh8ZaLPqXjqRcP5O8vdSjCMKqsXqXEuJLjeSoI6rB4avYKuec2j5X/mCIfrB8KqcXqXEuJLjeSdw1MHAfAVswHBoqKFsEIs0bXntPPi53ms4Dg0NFE2CFui0bXfk8+JceK7IBZ77TpPEeETIFlEWKBERAREQYXHPE17XMc0Oa4WLSLgjgVyog6PKWJrKGqY0WayFwDeAsolktjhoJXVDW6bzG5rQdlzaxPkvoWaIPaWOAc1wsWkaiPNSrHM2kn6lv6YtbSym5Ljrg42HiOH+vNdXTaVis1t9rVl5bBsLqsXqXEuc4uN5J3dlg8vgBW/AcGhoomwRNAa3a49p58XOPFMBweGiibBC2zW7T+Tz4uceK7ILPbabzxHiETIFlEWKBERAREQEREBERAWERRIyiIpBERAREQEREH//Z" />
                        {isSmallScreen &&
                            <Typography
                                variant="subtitle1"
                                color="inherit"
                                noWrap sx={{ fontWeight: "bold" }}
                            >
                                Logicea
                            </Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', pl: 4 }}>
                        <Tooltip title="Toggle theme">
                            <IconButton onClick={handleDarkModeToggle} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button
                        variant="contained"
                        color={session ?  "warning" : "primary" }
                        onClick={handleLogout}
                        size="small"
                        sx={{ borderRadius: "0.4rem" }}
                    >
                       {session ?   "Logout" :"Login"}
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}