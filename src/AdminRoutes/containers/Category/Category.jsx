// -------- Imports --------
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { object, string, mixed } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../../../redux/Slice/category.slice';
import TextInput from '../../component/TextInput/TextInput';
import ButtonInput from '../../component/ButtonInput/ButtonInput';
import Heading from '../../component/Heading/Heading';
import CustomTable from '../../component/CustomTable/CustomTable';
import { Margin } from '@mui/icons-material';


// -------- Component Setup --------
function Category(props) {

    // State Management Hooks
    const [open, setOpen] = React.useState(false);
    const [catData, setCatData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const counter = useSelector(state => state.count);
    const dispatch = useDispatch();


    // Open & close dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // -------- Yup Validation Schema --------
    let categorySchema = object({
        cat_ima: mixed().required("Please Select Category Image"),
        name: string().required("Please Enter Category Name"),
        description: string().required("Please Enter Category Description")
    });


    // -------- Formik Validation Setup --------
    const formik = useFormik({
        initialValues: {
            // cat_ima: null,
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            // Add or Update Category
            if (update === null) {
                dispatch(addCategory(values));
                // handleCategory(values);
            } else {
                dispatch(updateCategory({ ...values, id: update }));
                // updateCategorydata(values);
            }
            resetForm(); // Clear fields
            handleClose(); // Close dialog box mate
        },
    });
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues } = formik;
    console.log(errors);


    // -------- Fetching Data --------
    const getData = async () => {
        try {
            // const response = await fetch("http://localhost:3000/category");
            // const data = await response.json();

            dispatch(getAllCategory());

            // setCatData(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);


    const category = useSelector(state => state.category);
    console.log(category.category);



    // -------- table data list --------
    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 180 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];



    // -------- Update Category Function --------
    const updateCategorydata = async (data) => {
        console.log("Updating data:", data);
        try {
            const response = await fetch(`http://localhost:3000/category/` + data.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const dataref = await response.json();

            const index = catData.findIndex((v) => v.id === data.id);
            const updatedData = [...catData];
            updatedData[index] = dataref

            setCatData(updatedData);
            setUpdate(null);

        } catch (error) {
            console.log(error);
        }

    }


    // -------- Delete Category Function --------
    const handleDelete = async (id) => {
        // console.log(id);
        // try {
        //     const response = await fetch(`http://localhost:3000/category/${id}`, {
        //         method: 'DELETE',
        //     });
        //     const data = await response.json();

        //     const datedRows = catData.filter((v) => v.id !== id);
        //     setCatData(datedRows);
        // } catch (error) {
        //     console.log(error);
        // }
        dispatch(deleteCategory(id));
    };


    // -------- Edit Category Function --------
    const handleEdit = (data) => {
        handleClickOpen();
        setValues(data);

        setUpdate(data.id);
    };



    // const handleCategory = async (data) => {
    //     try {
    //         const catresponse = await fetch(`http://localhost:3000/category`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         const dataRef = await catresponse.json();
    //         setCatData([...catData, dataRef]);
    //         // setCatData((prev) => [...prev, dataRef]);
    //         console.log(catData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    // -------- Final Return: UI Layout --------
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <h1>Category {counter.count} </h1> */}
                <Heading title={"Category"} subtitle={"hjghjgjhjhjhjghnnbkjjghj"} />

                <ButtonInput
                    
                    onClick={handleClickOpen}
                    title="Add Category"

                />
            </Box>

            <>
                {/* -------- <h4>Dialog Box kevai chhe</h4> -------- */}
                {/*--- manually button handle code ---*/}
                {/* <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                       <span>  Add Category</span>
                    </Button>
                </Box> */}





                {/* -------- table data list formate -------- */}
                <CustomTable
                    rows={category.category}
                    columns={columns}
                />

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent sx={{ paddingBottom: 0 }}>

                        <Formik
                            initialValues={{
                                // cat_ima: null,
                                name: '',
                                description: '',
                            }}
                            validationSchema={categorySchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);

                                // Add or Update Category
                                if (update === null) {
                                    dispatch(addCategory(values));
                                    // handleCategory(values);
                                } else {
                                    dispatch(updateCategory({ ...values, id: update }));
                                    // updateCategorydata(values);
                                }
                                resetForm(); // Clear fields
                                handleClose(); // Close dialog box mate
                            }}
                        >

                            <Form>
                                <TextInput
                                    id="name"
                                    name="name"
                                    label="Name"
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // value={values.name}
                                // error={touched.name && errors.name}
                                // helperText={touched.name && errors.name ? errors.name : ''}
                                />
                                <TextInput
                                    id="description"
                                    name="description"
                                    label="Description"
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // value={values.description}
                                // error={touched.description && errors.description}
                                // helperText={touched.description && errors.description ? errors.description : ''}
                                />
                                <DialogActions>
                                    <Button type="submit">Submit</Button>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Form>

                        </Formik>


                    </DialogContent>
                </Dialog>
            </>

        </div>
    );
}

export default Category;