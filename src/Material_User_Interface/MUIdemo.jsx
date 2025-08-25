import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';


function MUIdemo(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleSubmit = () => {
        console.log({ name, email });
    };

    return (
        // <Container>

        //     <h2>MUIdemo example</h2>
        //     <TextField label="Enter your Name" variant="outlined" /><br /><br />

        //     <Button variant="contained" color="primary">Submit</Button>
        // </Container>


        <Box component="form" >
            <TextField
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                label="Email"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Sign Up
            </Button>
        </Box>


    );
}



export default MUIdemo;