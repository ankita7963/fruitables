import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField } from 'formik';
import { FormHelperText, MenuItem } from '@mui/material';

function RadioBtn({ label, id, data, ...props }) {

    const [field, meta] = useField(props);
    console.log(props, field, meta);

    return (
        <FormControl fullWidth margin="dense" variant="standard" error={meta.touched && meta.error}>

            <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
            <RadioGroup
                {...props}  //name
                {...field}  //onChange,onBlur,value
            >
                {data.map((v) => (
                    <FormControlLabel
                        key={v.value}
                        value={v.value}
                        label={v.label}
                        control={<Radio />}
                    />
                ))}
            </RadioGroup>

            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>
                {meta.touched && meta.error ? meta.error : ''}
            </FormHelperText>

        </FormControl>
    );
}

export default RadioBtn;