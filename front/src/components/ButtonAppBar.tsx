import * as React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import ClosetsMenu from './ClosetsMenu';


function ButtonAppBar(props) {
    const { handleLogout } = props;
    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <ClosetsMenu />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    InstaClothe
                </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            </Box>
        </div>
    );
}

export { ButtonAppBar };