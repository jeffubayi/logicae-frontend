import React from 'react'
import { Avatar, List, ListItem, Typography, ListItemText, ListItemAvatar, Button } from '@mui/material';
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';

export default function CardTitle() {
  const session = useSession();
  console.log(`session`, session)
  const router = useRouter();
  const handleAddJoke = () => {
    router.push(
      {
        pathname: "/jokes/[id]",
        query: {
          id: 0,
          method: "Create",
        },
      },
      `/jokes/create`
    );
  };
  return (
    <List sx={{ borderRadius: "1rem", mb: 1, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddJoke}
          size="small"
          sx={{ borderRadius: "0.4rem" }}
        >
          Add joke
        </Button>}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src='https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography color="text.primary">
              Logged in as:
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {session?.user.email}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}