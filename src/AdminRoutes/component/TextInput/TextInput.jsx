import { FormControl, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function TextInput({ id, label, type = "text", margin = "dense", variant = "standard", ...props }) {

    const [field, meta] = useField(props);
    console.log(props, field, meta);

    return (
       
            < TextField
                {...props}   //name
                {...field}   //onChange,onBlur,value
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ''}
                fullWidth
                margin={margin}
                id={id}
                label={label}
                type={type}
                variant={variant}
            />
    );
}

export default TextInput;

