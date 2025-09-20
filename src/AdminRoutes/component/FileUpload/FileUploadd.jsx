import { Label } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function FileUploadd({ label, id, ...props }) {

    const [field, meta, helpers] = useField(props);
    // console.log(props, field, meta, helpers);

    // console.log("field?.value", field?.value);


    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                {...props}
                {...field}
                type="file"
                onChange={(event) => helpers.setValue(event.target.files[0])}
                value={''}
            />
            <img
                style={{ width: '300px', height: '300px', objectFit: 'contain' }}
                src={
                    typeof field?.value?.url === 'string' ?
                        field?.value?.url : field?.value ? URL.createObjectURL(field?.value) : ''

                    // typeof field?.value === 'string' ?
                    //     '../public/img/categoryimg/' + field.value : field?.value ? URL.createObjectURL(field?.value) : ''

                }
            />
            <FormHelperText style={{ color: 'red', fontSize: '12px' }}>
                {meta.touched && meta.error ? meta.error : null}
            </FormHelperText>
            {/* ------------and---------- */}
            {/* {meta.touched && meta.error ? <p>{meta.error}</p> : null} */}
        </div>
    );
}

export default FileUploadd;