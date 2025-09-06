// -------- Imports --------
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { object, string } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../../redux/Slice/category.slice';
import {getAllSubCategory, addSubCategory, updateSubCategory, deleteSubCategory,} from '../../../redux/Slice/subcategory.slice';
import TextInput from '../../component/TextInput/TextInput';
import SelectInput from '../../component/SelectInput/SelectInput';
import ButtonInput from '../../component/ButtonInput/ButtonInput';


// -------- Component Setup --------
function SubCategory(props) {

    // State Management Hooks
    const [open, setOpen] = React.useState(false);
    const [subData, setSubData] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const [catData, setCatData] = React.useState([]);
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
        categoryId: string().required("Please Select Category"),
        name: string().required("Please Enter SubCategory Name"),
        description: string().required("Please Enter SubCategory Description")
    });


    // -------- Formik Validation Setup --------
    const formik = useFormik({
        initialValues: {
            categoryId: '',
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (update === null) {
                handleCategory(values);
            } else {
                updateCategorydata(values);
            }
            resetForm(); // Clear fields
            handleClose(); // Close dialog box mate
        },
    });
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues } = formik;
    console.log(errors);
    

    // Fetch subcategories
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3000/subCategory");
            const data = await response.json();

            setSubData(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch categories dropdown
    const getCategoryData = async () => {
        try {
            const response = await fetch("http://localhost:3000/category");
            const data = await response.json();

            console.log("dfdfd", data);
            
            setCatData(data);
        } catch (error) {
            console.log("Category fetch error:", error);
        }
    };

    const category = useSelector(state => state.category);
    console.log(category.category);

    useEffect(() => {
        getData();
        getCategoryData();
        dispatch(getAllSubCategory());
        dispatch(getAllCategory());
    }, []);

    const subCategory = useSelector(state => state.subCategory);
    console.log(subCategory);
    
    


    // DataGrid columns
    const columns = [
        {
            field: 'categoryId',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                const category = catData.find(cat => cat.id === params.value);
                return category ? category.name : 'N/A';
            },
        },
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
    const paginationModel = { page: 0, pageSize: 5 };


    


    // Create new subcategory
    const handleCategory = async (data) => {
        try {
            const subresponse = await fetch(`http://localhost:3000/subCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const dataRef = await subresponse.json();
            setSubData([...subData, dataRef]);
            // setCatData((prev) => [...prev, dataRef]);
            console.log(subData);
        } catch (error) {
            console.log(error);
        }
    }


    // Update existing subcategory
    const updateCategorydata = async (data) => {
        console.log("Updating data:", data);
        try {
            const response = await fetch(`http://localhost:3000/subCategory/` + data.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const dataref = await response.json();

            const index = subData.findIndex((v) => v.id === data.id);
            const updatedData = [...subData];
            updatedData[index] = dataref

            setSubData(updatedData);
            setUpdate(null);

        } catch (error) {
            console.log(error);
        }

    }

    // -------- Edit Category Function --------
    const handleEdit = (data) => {

        handleClickOpen();
        setValues(data);

        setUpdate(data.id);

    };


    // -------- Delete Category Function --------
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:3000/subCategory/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            const datedRows = subData.filter((v) => v.id !== id);
            setSubData(datedRows);
        } catch (error) {
            console.log(error);
        }
    };



    // -------- Final Return: UI Layout --------
    return (
        <div>
            <h2>Add SubCategory</h2>
 
             <>
             {/*--- manually button handle code ---*/}
             {/* <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                       <span>  Add SubCategory</span>
                    </Button>
                </Box> */}


                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonInput
                        onClick={handleClickOpen}
                        title="Add SubCategory"
                    />
                </Box>


                {/* -------- table data list formate -------- */}
                <DataGrid
                    rows={subData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />



                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>SubCategory</DialogTitle>
                    <DialogContent sx={{ paddingBottom: 0 }}>

                        <Formik
                            initialValues={{
                                categoryId: '',
                                name: '',
                                description: '',
                            }}
                            validationSchema={categorySchema}
                            enableReinitialize={true}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);

                                if (update === null) {
                                    handleCategory(values);
                                } else {
                                    updateCategorydata(values);
                                }
                                resetForm(); // Clear fields
                                handleClose(); // Close dialog box mate
                            }}
                        >

                            <Form>

                                {/*--- manually Select button handle code ---*/}
                                {/* <FormControl 
                            fullWidth 
                            margin="dense"
                                variant="standard"
                                error={touched.categoryId && Boolean(errors.categoryId)}
                            >
                                <InputLabel id="category-label"> Category </InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="categoryId"
                                    name="categoryId"
                                    value={values.categoryId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {catData.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.categoryId && errors.categoryId && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>{errors.categoryId}</p>
                                )}
                            </FormControl> */}

                                <SelectInput
                                    label="Category"
                                    id="categoryId"
                                    name="categoryId"
                                    data={catData}
                                    // value={values.categoryId}
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    label="Name"
                                />

                                <TextInput
                                    id="description"
                                    name="description"
                                    label="Description"
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

export default SubCategory;











//------------------------------------------------------------------------------------------------------------------------------------
// React Hooks, Event Handlers, Formik Methods, Yup Validation Schema Methods, Material UI (use this all methods)
// {

// import React from 'react';
// {/* step-2a (dilog box mate) */ }
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// {/* ---------------------------------------------------------------- */ }

// {/* step-3a (button style mate) */ }
// import Box from '@mui/material/Box';
// {/* ---------------------------------------------------------------- */ }

// {/* step-4a (table mate) */ }
// import { DataGrid } from '@mui/x-data-grid';
// {/* ---------------------------------------------------------------- */ }

// {/* step-5a (yup & formik use kari data print karva) */ }
// import { object, string } from 'yup';
// import { useFormik } from 'formik';
// {/* ---------------------------------------------------------------- */ }

// {/* step-6a (edit & delete mate) */ }
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// {/* ---------------------------------------------------------------- */ }











// {/* step-2 (mui thi dilog box bnavo) */ }
// {/* step-3 (mui thi box (button ne style apva mate box no use karvo{Add SubCategory})) */ }
// {/* step-4 (mui thi Table bnavo */ }
// {/* step-5 (yup & formik use kari data print karva */ }
// {/* step-6 (mui thi edit & delete & icon mate */ }





// function SubCategory(props) {
//     {/* step-2b (dilog box mate) */ }
//     const [open, setOpen] = React.useState(false);
//     const [rowsData, setRowsData] = React.useState([]);
//     const [editId, setEditId] = React.useState(null);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     // const handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     const formData = new FormData(event.currentTarget);
//     //     const formJson = Object.fromEntries(formData.entries());
//     //     const email = formJson.email;
//     //     console.log(email);
//     //     handleClose();
//     // };
//     {/* ---------------------------------------------------------------------- */ }


//     {/* step-4b (dilog box mate) */ }
//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'name', headerName: 'Name', width: 130 },
//         { field: 'description', headerName: 'Description', width: 180 },
//         {
//             field: 'action',
//             headerName: 'Action',
//             width: 150,
//             renderCell: (params) => (
//                 <>
//                     <IconButton color="primary" onClick={() => handleEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             ),
//         },
//     ];
    
//     const paginationModel = { page: 0, pageSize: 5 };
//     {/* ---------------------------------------------------------------------- */ }



//     {/* step-5b (yup) */ }
//     let subCategorySchema = object({
//         name: string().required("Please Enter SubCategory Name"),
//         description: string().required("Please Enter SubCategory Description")
//     });


//     {/* step-5c (formik) */ }
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             description: '',
//         },                                          //1
//         validationSchema: subCategorySchema,        //2    
//         onSubmit: (values, { resetForm }) => {
//             if (editId !== null) {
//                 // update 
//                 const updatedRows = rowsData.map((row) =>
//                     row.id === editId ? { ...row, name: values.name, description: values.description } : row
//                 );
//                 setRowsData(updatedRows);
//                 setEditId(null); // reset edit mode chhe
//             } else {
//                 // add 
//                 const newRow = {
//                     id: rowsData.length + 1,
//                     name: values.name,
//                     description: values.description,
//                 };
//                 setRowsData([...rowsData, newRow]);
//             }

//             resetForm(); // Clear fields
//             handleClose(); // Close dialog box
//         },
//     });
//     const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;     //3
//     console.log(errors);


//     {/* step-5d (edit function) */ }
//     const handleEdit = (row) => {
//         formik.setValues({
//             name: row.name,
//             description: row.description,
//         });
//         setEditId(row.id);
//         setOpen(true);
//     };


//     {/* step-5d (delete function) */ }
//     const handleDelete = (id) => {
//         const updatedRows = rowsData.filter((row) => row.id !== id);
//         setRowsData(updatedRows);
//     };
//     {/* ---------------------------------------------------------------------- */ }



//     return (
//         <div>
//             {/* step-1 */}
//             <h1>SubCategory</h1>

//             {/* step-2c (dilog box mate) */}
//             <>
//                 {/* step-3b (button style mate) */}
//                 <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-end'
//                 }}>
//                     <Button variant="outlined" onClick={handleClickOpen} >
//                         Add SubCategory
//                     </Button>
//                 </Box>
//                 {/* --------------------------------------------------- */}


//                 {/* step-4c (button style mate) */}
//                 <DataGrid
//                     rows={rowsData}
//                     columns={columns}
//                     initialState={{ pagination: { paginationModel } }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                     sx={{ border: 0 }}
//                 />
//                 {/* --------------------------------------------------- */}



//                 <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>SubCategory</DialogTitle>
//                     <DialogContent sx={{ paddingBottom: 0 }}>

//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="Name"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.name}
//                                 error={touched.name && errors.name}
//                                 helperText={touched.name && errors.name ? errors.name : ''}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="description"
//                                 name="description"
//                                 label="Description"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.description}
//                                 error={touched.description && errors.description}
//                                 helperText={touched.description && errors.description ? errors.description : ''}
//                             />
//                             <DialogActions>
//                                 <Button type="submit">Submit</Button>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                             </DialogActions>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </>
//             {/* ---------------------------------------------------------------------------------------- */}


//         </div>
//     );
// }

// export default SubCategory;




// // -----------------------------------------------------------------------------------
// // ✅ સારાંશ: આ કોડ બનાવાયો છે નીચેના પ્રકારના methods વડે:
// // ✅ Core React:
// // useState()

// // ✅ Formik & Yup:
// // useFormik(), handleSubmit, handleChange, handleBlur, setValues

// // object(), string(), required()

// // ✅ Custom Methods:
// // handleClickOpen(), handleClose(), handleEdit(), handleDelete()

// // ✅ Material UI Methods (as components):
// // Dialog, TextField, Button, IconButton, etc.
// // -----------------------------------------------------------------------------------

// }