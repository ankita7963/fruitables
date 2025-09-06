// import React from 'react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControlLabel, FormGroup, Paper, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { object, string } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../../../redux/Slice/category.slice';
import TextInput from '../../component/TextInput/TextInput';
import ButtonInput from '../../component/ButtonInput/ButtonInput';
import { getAllReviewData,  updateReview } from '../../../redux/Slice/review.slice';
import { useParams } from 'react-router-dom';
import FileOpenIcon from '@mui/icons-material/FileOpen';

function Review(props) {


    const dispatch = useDispatch();

    // State Management Hooks
    const [openDialog, setOpenDialog] = useState(false);          //dilogbox open karva mate
    const [selectedReview, setSelectedReview] = useState(null);
    const [switchStatus, setSwitchStatus] = useState(false);       //switchStatus-on-ture
    console.log();


    // -------- Fetch all review data --------
    useEffect(() => {
        dispatch(getAllReviewData());
    }, [dispatch]);


    // Review data from Redux all get
    const review = useSelector(state => state.review);
    console.log("review list array:", review.review);
    const rows = review.review || [];
    



    // Open Dialog selected row data
    const handleRevieBox = (v) => {
        console.log(v);
        setSelectedReview(v);
        setSwitchStatus(v.status === 'true');
        setOpenDialog(true);
    };


    // Submit updated data
    const handleSubmit = () => {
        const updated = { ...selectedReview, status: switchStatus ? true : false };
        dispatch(updateReview(updated));
        setOpenDialog(false);
        setSelectedReview(null);
    };


    // Close dialog  saving
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReview(null);
    };
    const paginationModel = { page: 0, pageSize: 5 };



    // --- (DataGrid Columns)Leave a Reply Review Report Data: table ---
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'pid', headerName: 'Product_ID', width: 170 },
        { field: 'product_name', headerName: 'Product_Name', width: 170 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'review', headerName: 'Review', width: 130 },
        { field: 'rate', headerName: 'Rate', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={params.row.status === 'true'}
                                disabled
                            />
                        }
                        label={params.row.status === 'true' ? 'Approved' : ''}
                    />
                </FormGroup>
            )
        },
        {
            field: 'confirmation',
            headerName: 'Confirmation',
            width: 180,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleRevieBox(params.row)}>
                        <FileOpenIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    // --- Leave a Reply Review Report Data: table end ---







    // -------- Final Return: UI Layout --------
    return (
        <div>
            <h1>Review </h1>

            {/* Review data-dialogbox (popup window) */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>

                <DialogTitle>Review Action</DialogTitle>
                <DialogContent>
                    {selectedReview && (
                        <Box sx={{ mt: 2 }}>
                            {/* review print */}
                            <div><strong>Product Name:</strong> {selectedReview.product_name}</div>
                            <div><strong>Reviewer:</strong> {selectedReview.name}</div>
                            <div><strong>Review:</strong> {selectedReview.review}</div>
                            <div><strong>Rate:</strong> {selectedReview.rate}</div>
                            {/* switch added */}
                            <FormGroup sx={{ mt: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={switchStatus}
                                            onChange={(e) => setSwitchStatus(e.target.checked)}
                                        />
                                    }
                                    label="Mark as Approved"
                                />
                            </FormGroup>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button type="submit" onClick={handleSubmit} >Submit</Button>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>

            </Dialog>



            {/* Review data from Redux all get */}
            <Paper sx={{ height: 400, width: '100%' }}>
                {review.review.length > 0 && (
                    <>
                        {console.log("review list array:", review.review)}
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={review.review}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </div>
                    </>
                )}

            </Paper>

        </div>
    );

}

export default Review;

