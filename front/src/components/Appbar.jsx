import * as React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { MenuIcon } from '@mui/icons-material';

export default function ButtonAppBar(props) {
    const { onAddClick } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon onClick={onAddClick}/>
                </Fab>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                InstaClothe
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
    }
