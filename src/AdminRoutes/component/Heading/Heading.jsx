import { Box, createTheme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { token } from '../../theme';

function Heading({ title, subtitle }) {
    const theme = useTheme();
    const color = token(theme.palette.mode);

    return (
        <Box>
            <Typography variant='h2' color='primary'>
                {title}
            </Typography>
            <Typography
                variant='p'
                // sx={{color: theme.palette.primary.main}}
                sx={{color: color.secondary[400]}}
            >
                {subtitle}
            </Typography>
        </Box>
    );
}

export default Heading;