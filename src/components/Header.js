import { AppBar, Toolbar, Typography } from '@mui/material';
import { Fragment } from 'react';

const Header = () => (
    <Fragment>
        <AppBar  sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Toolbar>
            <Typography component="h5" sx={{ textTransform: 'uppercase' }}>
                pentago
            </Typography>
        </Toolbar>
        </AppBar>
    </Fragment>
)

export default Header;
