import { FormControl, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function TextInput({ id, name, type="text", label, onChange, onBlur, value, error,  margin="dense", variant = "standard", helperText }) {
    const [field, meta] = useField(props)
    console.log(props, field, meta);
    


    return (
        <FormControl>
            < TextField
                margin={margin}
                id={id}
                name={name}
                label={label}
                type={type}
                fullWidth
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                helperText={helperText}
                variant={variant}
            />
        </FormControl>
    );
}

export default TextInput;

