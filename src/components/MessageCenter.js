import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

export default function MessageCenter( props ) {
    
    const { msg } = props;

    return (
        <Fragment>
            <Box sx={{ mt: 15, textTransform: 'uppercase' }}>
                <Typography component='h3'>{msg}</Typography>
            </Box>
        </Fragment>
    );
}
