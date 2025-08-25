// -------- Imports --------
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../../redux/Slice/category.slice';
import { getAllSubCategory } from '../../../redux/Slice/subcategory.slice';
import { addProductData, deleteProduct, getAllProduct, productSlice, updateProduct } from '../../../redux/Slice/product.slice';
import TextInput from '../../component/TextInput/TextInput';
import SelectInput from '../../component/SelectInput/SelectInput';
// import ButtonInput from '../../component/ButtonInput/ButtonInput';




// -------- Component Setup --------
function Product(props) {

    // State Management Hooks
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [imageName, setImageName] = React.useState('');
    const [preview, setPreview] = React.useState(null);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllSubCategory());
        dispatch(getAllProduct());
    }, []);


    const cat = useSelector(state => state.category);
    console.log(cat.category);
    const subcat = useSelector(state => state.subCategory);
    console.log(subcat.subCategory);

    const prod = useSelector(state => state.product);
    console.log(prod.product);


    // Open & close dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // -------- Yup Validation Schema --------
    let productSchema = object({
        categoryId: string().required("Please Select Category"),
        subcategoryId: string().required("Please Select SubCategory"),
        title: string().required("Please Enter Title"),
        description: string().required("Please Enter Product Description"),
        price: string().required("Please Selet Price"),
        product_img: mixed().required("Please Select Filed")
            .test("profiled", "Please Select png, jpg & jpeg Filed Upload", function (val) {
                console.log(val);

                let filetype = val.type.toLowerCase();
                console.log(filetype);

                if (filetype === "image/png" || filetype === "image/jpg" || filetype === "image/jpeg") {
                    return true;
                } else {
                    return false;
                }
            })
            .test("profiled", "Please Upload 2mb filed", function (val) {
                console.log(val.size);
                if (val.size <= 2 * 1024 * 1024) {
                    return true;
                } else {
                    return false;
                }
            }),
    });


    // -------- Formik Validation Setup --------
    const formik = useFormik({
        initialValues: {
            categoryId: '',
            subcategoryId: '',
            title: '',
            description: '',
            price: '',
            product_img: null
        },
        validationSchema: productSchema,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            console.log({ ...values, product_img: values.product_img.name });
            if (update === null) {
                dispatch(addProductData({ ...values, product_img: values.product_img.name }));
            } else {
                dispatch(updateProduct({ ...values, product_img: values.product_img.name }));
            }
            resetForm(); // Clear fields
            handleClose(); // Close dialog box mate
        },
    });
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, setFieldValue } = formik;
    console.log(errors);


    // DataGrid columns
    const columns = [
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <Box
                    sx={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: 1, }}
                >
                    <img
                        src={`../public/img/categoryimg/${params.row.product_img}`}
                        alt="product"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>
            )
        },
        {
            field: 'categoryId',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                const category = cat.category.find(cat => cat.id === params.value);
                return category ? category.name : 'N/A';
            },
        },
        {
            field: 'subcategoryId',
            headerName: 'SubCategory',
            width: 150,
            renderCell: (params) => {
                const subcategory = subcat.subCategory.find(sub => sub.id === params.value);
                return subcategory ? subcategory.name : 'N/A';
            },
        },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 180 },
        { field: 'price', headerName: 'Price', width: 130 },
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


    // Update existing subcategory
    const updateProductdata = async (data) => {
        try {
            dispatch(getAllProduct());
        } catch (error) {
            console.log(error);
        }
    }


    // -------- Delete Product Function --------
    const handleDelete = async (id) => {
        console.log("delete data", id);

        dispatch(deleteProduct(id));
    }

    // -------- Edit Product Function --------
    const handleEdit = (data) => {
        handleClickOpen();
        setValues(data);

        setUpdate(data.id);
    }





    // -------- Final Return: UI Layout --------
    return (
        <div>
            <h2>Product</h2>

            <>

             <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                       <span>  Add SubCategory</span>
                    </Button>
                </Box>


                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonInput
                        onClick={handleClickOpen}
                        title="All Product"
                    />
                </Box> */}


                {/* -------- table data list formate -------- */}
                <DataGrid
                    rows={prod.product}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Product</DialogTitle>
                    <DialogContent sx={{ paddingBottom: 0 }}>

                        <form onSubmit={handleSubmit}>

                            <SelectInput
                                label="Category"
                                id="categoryId"
                                name="categoryId"
                                value={values.categoryId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                data={cat.category}
                                error={touched.categoryId && errors.categoryId}
                                helperText={touched.categoryId && errors.categoryId ? errors.categoryId : ''}
                            />

                            {/* <FormControl fullWidth margin="dense"
                                variant="standard"
                                error={touched.subcategoryId && Boolean(errors.subcategoryId)}
                            >
                                <InputLabel id="subcategory-label"> SubCategory </InputLabel>
                                <Select
                                    labelId="subcategory-label"
                                    id="subcategoryId"
                                    name="subcategoryId"
                                    value={values.subcategoryId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {subcat.subCategory?.filter(sub => sub.categoryId === values.categoryId).map(sub => (
                                        <MenuItem key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.subcategoryId && errors.subcategoryId && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>{errors.subcategoryId}</p>
                                )}
                            </FormControl> */}

                            <SelectInput
                                label="SubCategory"
                                id="subcategoryId"
                                name="subcategoryId"
                                value={values.subcategoryId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                data={subcat.subCategory?.filter(sub => sub.categoryId === values.categoryId)}
                                error={touched.subcategoryId && errors.subcategoryId}
                                helperText={touched.subcategoryId && errors.subcategoryId ? errors.subcategoryId : ''}
                            />

                            <TextInput
                                margin="dense"
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                error={touched.title && errors.title}
                                helperText={touched.title && errors.title ? errors.title : ''}
                            />

                            <TextInput
                                id="description"
                                name="description"
                                label="Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={touched.description && errors.description}
                                helperText={touched.description && errors.description ? errors.description : ''}
                            />

                            <TextInput
                                id="price"
                                name="price"
                                label="Price"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={touched.price && errors.price}
                                helperText={touched.price && errors.price ? errors.price : ''}
                            />

                            <FormControl fullWidth margin="dense">
                                <InputLabel shrink>Product Image</InputLabel>
                                <input
                                    accept="image/png, image/jpeg, image/jpg"
                                    name="product_img"
                                    type="file"
                                    onChange={(e) => setFieldValue("product_img", e.target.files[0])}
                                    onBlur={handleBlur}
                                    style={{ marginTop: 8 }}

                                />
                                {
                                    values.product_img &&

                                    <Box
                                        sx={{
                                            width: 100, height: 100, overflow: 'hidden', mt: 1, borderRadius: 2,
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            src={typeof values.product_img === 'string'
                                                ? "../public/img/categoryimg/" + values.product_img
                                                : URL.createObjectURL(values.product_img)
                                            }
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </Box>

                                }
                                {touched.product_img && errors.product_img && (
                                    <p style={{ color: 'red', fontSize: '12px' }}>{errors.product_img}</p>
                                )}
                            </FormControl>

                            <DialogActions>
                                <Button type="submit">Submit</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </form>

                    </DialogContent>
                </Dialog>
            </>
        </div>
    );
}

export default Product;