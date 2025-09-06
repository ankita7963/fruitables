import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function SelectInput({ label, id, data, variant = "standard", type = "text", margin = "dense", ...props }) {

    const [field, meta] = useField(props);
    console.log(props, field, meta);

    return (
        <FormControl fullWidth margin="dense" variant="standard"  error={meta.touched && meta.error}>
            <InputLabel id="category-label"> {label} </InputLabel>
            <Select
                {...props}  //name
                {...field}  //onChange,onBlur,value
               
                labelId={`label` - label}
                margin={margin}
                id={id}
                label={label}
                type={type}
                variant={variant}
            >
                {data.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
            
            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>{meta.touched && meta.error ? meta.error : ''}</FormHelperText>
        </FormControl>
    );
}

export default SelectInput;