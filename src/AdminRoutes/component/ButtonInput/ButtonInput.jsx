import { Box, Button } from '@mui/material';
import React from 'react';

function ButtonInput({ variant = "outlined", onClick, title, type }) {
    return (

        <Button
            variant={variant}
            onClick={onClick}
            type={type}
        >
            {title}
        </Button>

    );
}

export default ButtonInput;