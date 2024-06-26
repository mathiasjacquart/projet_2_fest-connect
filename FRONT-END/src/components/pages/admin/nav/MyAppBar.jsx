// in src/MyAppBar.js
import * as React from 'react';
import { AppBar, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';



export const MyAppBar = () => (
    <AppBar sx={{ backgroundColor:"#2B2D42" , display:"flex", flexDirection:"column"}} >
        <TitlePortal />

    </AppBar>
);