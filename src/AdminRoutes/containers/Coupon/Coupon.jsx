// -------- Imports --------
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { date, mixed, number, object, string } from 'yup';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import TextInput from '../../component/TextInput/TextInput';
import CustomTable from '../../component/CustomTable/CustomTable';
import { useAddCouponMutation, useDeleteCouponMutation, useGetAllCouponQuery, useUpdateCouponMutation } from '../../../redux/api/couponApi';
import { DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadd from '../../component/FileUpload/FileUploadd';



function Coupon(props) {
    // State Management Hooks
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(null);
    const dispatch = useDispatch();


    const [addCoupon] = useAddCouponMutation();
    const [updateCoupon] = useUpdateCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();


    // Open & close dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (data) => {
        handleClickOpen();
        setUpdate(data)
    }
    
    let couponSchema = object({
        coupon: string().required(),
        percentage: number().required(),
        expiry: date().required(),
        stock: number().required(),
        coupon_image: mixed().required().
            test("profiled", "Please Select png, jpg & jpeg Filed Upload", function (val) {
                console.log(val);

                if (typeof val?.url === "string") {
                    return true
                }

                let filetype = val.type.toLowerCase();
                console.log(filetype);

                if (filetype === "image/png" || filetype === "image/jpg" || filetype === "image/jpeg") {
                    return true;
                } else {
                    return false;
                }
            })
            .test("profiled", "Please Upload 2mb filed", function (val) {
                if (typeof val?.url === "string") {
                    return true
                }

                console.log(val.size);
                if (val.size <= 2 * 1024 * 1024) {
                    return true;
                } else {
                    return false;
                }
            })
    });


    const columns = [
        { field: 'coupon', headerName: 'Coupon', width: 130 },
        { field: 'percentage', headerName: 'Percentage', width: 180 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        { field: 'stock', headerName: 'Stock', width: 130 },
        {
            field: 'coupon_image',
            width: 200,
            renderCell: (params) => (
                <img

                    // src={`../public/img/categoryimg/${params.row.coupon_image}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    src={`${params?.row?.coupon_image?.url}`}
                />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteCoupon(params.row?._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },

    ]

    const { isLoading, data, error } = useGetAllCouponQuery();
    console.log(data?.data);




    return (

        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Coupon</h2>
                <Button variant='outlined' onClick={handleClickOpen}>
                    Add Coupon
                </Button>
            </div>

            <CustomTable
                rows={data?.data}
                columns={columns}

            />


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Coupon</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={
                            update ?
                                update :
                                {
                                    coupon: '',
                                    percentage: '',
                                    expiry: '',
                                    stock: '',
                                    coupon_image: '',
                                }
                        }
                        validationSchema={couponSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log({ ...values, coupon_image: values.coupon_image.name });


                            let formData = new FormData();

                            console.log("values", values, Object.entries(values));

                            Object.entries(values).map(([key, val]) => {
                                console.log(key, val);

                                if (key === "coupon_image") {
                                    if (val instanceof File) {
                                        formData.append(key, val);
                                    }
                                } else {
                                    formData.append(key, val);
                                }

                            })
                            console.log(formData);



                            if (update) {
                                // let upDate = {};

                                // if (typeof values.coupon_image === 'string') {
                                //     upDate = { ...values };
                                // } else {
                                //     upDate = { ...values, coupon_image: values.coupon_image.name };
                                // }
                                // updateCoupon({ upDate });

                                updateCoupon({_id: values._id, body : formData});

                            } else {

                                // addCoupon({ ...values, coupon_image: values.coupon_image.name });
                                addCoupon(formData);
                            }
                            resetForm(); // Clear fields
                            handleClose(); // Close dialog box mate
                        }}
                    >

                        <Form id="coupon-form">
                            <TextInput
                                id="coupon"
                                name="coupon"
                                label="Coupon"
                            />
                            <TextInput
                                id="percentage"
                                name="percentage"
                                label="Percentage"
                            />
                            <TextInput
                                id="expiry"
                                name="expiry"
                                label="Expiry"
                                type='date'
                            />
                            <TextInput
                                id="stock"
                                name="stock"
                                label="Stock"
                            />

                            <FileUploadd
                                id="coupon_image"
                                name="coupon_image"
                                label="Image"
                            />

                            <DialogActions>
                                <Button type="submit" form="coupon-form">Submit</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </React.Fragment >

    );
}

export default Coupon;