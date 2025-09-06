import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useField } from 'formik';

function CheckboxGroup({ label, id, data, ...props }) {

    const [field, meta, helpers] = useField(props);
    console.log(props, field, meta, helpers);

    const handleChange = (value) => {
        console.log(value);

        if (field.value.includes(value)) {
            const fData = field.value.filter(v => v !== value);

            helpers.setValue(fData);
            
        } else {
            helpers.setValue([...field.value, value])
        }
    }

    return (
        <FormControl
            required
            error={meta.touched && meta.error}
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
        >
            <FormLabel component="legend">Hobby</FormLabel>
            <FormGroup>
                {
                    data.map((v, i) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={gilad}

                                    {...field}
                                    onChange={() => handleChange(v.value)}
                                />
                            }
                            label={v.label}
                        />
                    ))
                }
            </FormGroup>

            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>
                {meta.touched && meta.error ? meta.error : ''}
            </FormHelperText>
        </FormControl>
    );
}

export default CheckboxGroup;