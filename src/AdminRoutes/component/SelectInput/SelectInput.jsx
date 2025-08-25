import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

function SelectInput({ label, id, name, value, onChange, onBlur, error, helperText, data, variant = "standard" }) {
    return (
        <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="category-label"> {label} </InputLabel>
            <Select
                labelId={`label` - label}
                id={id}
                name={name}
                value={value}
                fullWidth
                onChange={onChange}
                onBlur={onBlur}
                variant={variant}
                error={error}
            >
                {data.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default SelectInput;