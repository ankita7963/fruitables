import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllProduct } from '../../redux/Slice/product.slice';
import { getAllCategory } from '../../redux/Slice/category.slice';
import { addToCart } from '../../redux/Slice/cart.slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Rating, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { addReviewData, getAllReviewData } from '../../redux/Slice/review.slice';
import { addtoCart1 } from '../../redux/Slice/cart1.slice';

function ShopDetail(props) {

    const { id } = useParams();
    console.log(id);

    // --- Leave a Reply form code in formik ---
    const [reviewList, setReviewList] = useState([]);

    let proReviewSchema = object({
        name: string().required("Please Enter Name"),
        email: string().email().required("Please Enter Email"),
        review: string().required("Please Enter Product Review"),
        rate: string().required("Please Selet Rate")
    });

    const generateRandomString = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
            rate: ''
        },
        validationSchema: proReviewSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            // setReviewList(values);   // Save data to display

            // setReviewList(prevList => {
            //     console.log("Previous list:", prevList);

            //     const newReview = {
            //         shopDetailId: fData?.id,
            //         id: prevList.length + 1,
            //         name: values.name,
            //         email: values.email,
            //         review: values.review,
            //         rate: values.rate
            //     };


            //     return [...prevList, newReview];
            // });

            const newReview = {
                id: generateRandomString(),
                pid: id,
                product_name: fData?.title,
                name: values.name,
                email: values.email,
                review: values.review,
                rate: values.rate,
                status: false
            };
            dispatch(addReviewData(newReview));
            resetForm();     // Reset form
        }


    });
    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setValues, setFieldValue } = formik;
    console.log(errors);
    // --- Leave a Reply form code in formik end ---


    // -------- Fetching Data --------
    const getData = async () => {
        try {
            dispatch(getAllReviewData());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const review = useSelector(state => state.review);
    console.log(review.review);


    const dispatch = useDispatch();
    const [category, setCategory] = React.useState(null);
    const [count, setCount] = useState(1);



    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllProduct());
    }, [])

    const cadata = useSelector(state => state.category);
    console.log(cadata.category);
    const prodata = useSelector(state => state.product);
    console.log(prodata.product);

    const fData = prodata.product.find((v) => v.id === id);
    console.log(fData);
    const cart = useSelector(state => state.cart)
    console.log(cart);

    const handleDec = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const handleInc = () => {
        if (count < 10) {
            setCount(count + 1)
        }
    }

    const handleCounter = (val) => {
        if (val >= 1 && val <= 10) {
            setCount(val)
        }
    }


    const reviewTable = review.review.filter(v => v.pid === fData?.id && v.status);
    console.log(reviewTable);

    return (

        <div>


            {'{'} {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop Detail</li>
                </ol>
            </div>
            {/* Single Page Header End */}


            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">

                                {/* shop -> shopdetails -> product image box */}
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <a href="#">
                                            <img
                                                src={`../public/img/categoryimg/${fData?.product_img}`}
                                                className="w-100 h-100 object-fit-cover rounded-top"
                                                alt="Product image"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </a>
                                    </div>
                                </div>

                                {/* shop -> shopdetails -> product image -> details*/}
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{fData?.title}</h4>
                                    <p className="mb-3">{fData?.description}</p>
                                    <h5 className="fw-bold mb-3">${fData?.price} / kg</h5>
                                    <div className="d-flex mb-4">
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <p className="mb-4">
                                        The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                                    </p>
                                    <p className="mb-4">
                                        Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish
                                    </p>

                                    {/* add & delete qty button */}
                                    <div className="input-group quantity mb-5" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button
                                                onClick={() => handleDec()}
                                                disabled={count === 1}
                                                className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>

                                        <input
                                            value={count}
                                            onChange={(event) => handleCounter(parseInt(event.target.value))}
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            defaultValue={1}
                                        />

                                        <div className="input-group-btn">
                                            <button
                                                onClick={() => handleInc()}
                                                disabled={count === 10}
                                                className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>

                                    {/*  Add to cart &    add & delete qty {} */}
                                    <NavLink
                                        onClick={() => dispatch(
                                            addtoCart1({
                                                userid: 'ghjghj',
                                                cart: { id: fData?.id, qty: count }
                                            })
                                        )}
                                        to={'/cart'}
                                        href="#"
                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                        <i className="fa fa-shopping-bag me-2 text-primary" />
                                        Add to cart
                                    </NavLink>
                                </div>

                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" aria-controls="nav-about" aria-selected="true">Description</button>
                                            <button className="nav-link border-white border-bottom-0" type="button" role="tab" id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission" aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                                                Susp endisse ultricies nisi vel quam suscipit </p>
                                            <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish filefish Antarctic
                                                icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric ray sweeper.</p>
                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">1 kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Country of Origin</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Agro Farm</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Quality</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Organic</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Сheck</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Healthy</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Min Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">250 Kg</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                2
                                            </div>
                                        </div>



                                        {/* ------------------------------------------------------------------Review---------------------------------------------------------------------------------- */}
                                        <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                            {reviewTable.map((v) =>
                                                <div className="d-flex">
                                                    <img
                                                        src={`../public/img/categoryimg/${v.product_img}`}
                                                        className="img-fluid rounded-circle p-3"
                                                        style={{ width: 100, height: 100 }} alt
                                                    />
                                                    <div className>
                                                        <div className="d-flex justify-content-between">
                                                            <h5>{v.name}</h5>
                                                            <div className="d-flex mb-3"> {v.rate}</div>
                                                            <Rating name="read-only" value={v.rate} readOnly />

                                                            {/* <div className="d-flex mb-3">
                                                                <i className="fa fa-star text-secondary" />
                                                                <i className="fa fa-star text-secondary" />
                                                                <i className="fa fa-star text-secondary" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                            </div> */}
                                                        </div>
                                                        <p>{v.review}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="tab-pane" id="nav-vision" role="tabpanel">
                                            <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                                amet diam et eos labore. 3</p>
                                            <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                                Clita erat ipsum et lorem et sit</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ------------------------------------------------------------------Leave a Reply Form---------------------------------------------------------------------------------- */}
                                <form onSubmit={handleSubmit} >
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Yur Name *"
                                                    className="form-control border-0 me-4"
                                                    style={{ cursor: 'pointer' }}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <span style={{ color: 'red' }}>
                                                {errors.name && touched.name ? errors.name : ''}
                                            </span>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    placeholder="Your Email *"
                                                    className="form-control border-0"
                                                    style={{ cursor: 'pointer' }}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <span style={{ color: 'red' }}>
                                                {errors.email && touched.email ? errors.email : ''}
                                            </span>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea
                                                    id="review"
                                                    name="review"
                                                    type="text"
                                                    placeholder="Your Review *"
                                                    className="form-control border-0"
                                                    spellCheck="false"
                                                    defaultValue={""}
                                                    cols={30} rows={8}
                                                    style={{ cursor: 'pointer' }}
                                                    value={values.review}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <span style={{ color: 'red' }}>
                                                {errors.review && touched.review ? errors.review : ''}
                                            </span>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <Stack spacing={1}>
                                                        <Rating
                                                            id="rate"
                                                            name="rate"
                                                            precision={0.5}
                                                            defaultValue={2.5}
                                                            style={{ cursor: 'pointer' }}
                                                            value={values.rate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Stack>
                                                    <span style={{ color: 'red' }}>
                                                        {errors.rate && touched.rate ? errors.rate : ''}
                                                    </span>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                >
                                                    Post Comment
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                                {/* {review.review.length > 0 && (
                                    <>
                                        {console.log("review list array:", review.review)}

                                        <div style={{ height: 400, width: '100%' }}>
                                            <h3 className="mb-3">Leave a Reply Review Report Data:</h3>
                                            <DataGrid
                                                rows={review?.review?.filter(item => item.pid == fData?.id)}
                                                columns={columns}
                                                nitialState={{ pagination: { paginationModel } }}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                checkboxSelection
                                            />
                                        </div>
                                    </>
                                )} */}

                                {/* ----------------------------------------------------------------------------------------------------------------------------------------------------*/}

                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">

                                <div className="col-lg-12">

                                    {/* Search productdata */}
                                    <div className="input-group w-100 mx-auto d-flex mb-4">
                                        <input type="search" className="form-control p-3" placeholder="Search" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>

                                    {/* category head */}
                                    <div className="mb-4">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled fruite-categorie">
                                            {cadata.category.map((v) => (
                                                <li key={v.id}>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href={`/shop/${v.id}`} onClick={() => setCategory(v.id)}
                                                            style={{ cursor: 'pointer', color: category === v.id ? '#81c408' : 'black' }}
                                                        >
                                                            <i className="fas fa-apple-alt me-2" />
                                                            {v.name}
                                                        </a>
                                                        <span>
                                                            ({prodata.product.filter((p) => p.categoryId === v.id).length})
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                                <div className="col-lg-12">
                                    <h4 className="mb-4">Featured products</h4>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="img/featur-1.jpg" className="img-fluid rounded" alt="Image" />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="img/featur-2.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="img/featur-3.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="img/vegetable-item-4.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="img/vegetable-item-5.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="img/vegetable-item-6.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                                        <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                                            <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* product -> shopdeatils -> Slider */}
                    <h1 className="fw-bold mb-0">Related products</h1>
                    {/* <div className="vesitable">
                        <div className="owl-carousel vegetable-carousel justify-content-center">
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Banana</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Bell Papper</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
            {/* Single Product End */}
        </div >

    );
}

export default ShopDetail;