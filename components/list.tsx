import React from 'react'
import { Avatar, List, ListItem, Typography, ListItemText, ListItemAvatar, Button } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';

export default function CardTitle({ handleAddJoke }: { handleAddJoke: any }) {
  const session = useSession();
  return (
    <List sx={{ borderRadius: "1rem", mb: 1, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <>
          {
            session ? (<Button
              variant="contained"
              startIcon={< AddIcon />}
              onClick={handleAddJoke}
              size="small"
              sx={{ borderRadius: "0.4rem" }}
            >
              Add joke
            </Button>) : null}
        </>}>

        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src='https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography color="text.primary">
              {session ? "Logged in as:" : "No User found!!"}
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {session?.user.email || "Please login to add jokes"}
            </Typography>
          }
        />
      </ListItem>
    </List >
  );
}