import Head from "next/head";
import React from "react";
import { Avatar, DialogContent, Dialog, Button, Typography } from '@mui/material';
import { useUser} from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";

export default function Jokes() {
  const router = useRouter();
  const user = useUser()
    return (
        <React.Fragment>
            <Head>
                <title>Verify Account </title>
            </Head>
            <Dialog
                maxWidth="xl"
                open={true}
            >
                <DialogContent sx={{ display: "flex",flexDirection:"column", justifyContent: "center", textAlign: "center",p:2,alignItems:"center"}}>
                    <div>
                        <Avatar
                            sx={{  height: "4rem", width: "4rem" }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq56ZEZEoAO3LQM58USPv73nePUxfRscHvsZyj9pmzdA&s"
                       />
                    </div>
                    <div>
                        <Typography variant="subtitle1" sx={{m:2}}>
                        {!user?.id ?  "Check your Email to Verify your account" :"Account Verification Successful"}
                        </Typography>
                        {user?.id && 
                        <Button size="small" variant="contained" onClick={()=> router.push('/')}>
                            Redirect to homepage
                        </Button>
                        }
                    </div>
                </DialogContent>
            </Dialog>

        </React.Fragment>
    );
}