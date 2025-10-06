import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useField } from 'formik';
import { FormControl, FormHelperText } from '@mui/material';

function Switchh({ label, id, ...props }) {

    const [field, meta, helpers] = useField(props);
    console.log(props, field, meta, helpers);

    return (
        <FormControl
            error={meta.touched && meta.error}
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            {...props}  //name
                            {...field}  //onChange,onBlur,value
                            checked={field.value || false}
                        />
                    }
                    label={label}
                />
            </FormGroup>
            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>
                {meta.touched && meta.error ? meta.error : ''}
            </FormHelperText>
        </FormControl >
    );
}

export default Switchh;