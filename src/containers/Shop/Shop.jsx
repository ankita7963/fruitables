import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/Slice/category.slice';
import { getAllProduct } from '../../redux/Slice/product.slice';
import { getAllSubCategory } from '../../redux/Slice/subcategory.slice';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { NavLink, useParams } from 'react-router-dom';


function Shop(props) {
    const [currentpage, setCurrentpage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [rangeValue, setRangeValue] = useState(0);
    const [category, setCategory] = React.useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
    
    useEffect( () => {
        if (id) {
            setCategory(id)
        }
    }, [] );


    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllSubCategory());
        dispatch(getAllProduct());
    }, []);

    const cadata = useSelector(state => state.category);
    console.log(cadata.category);
    const sacadata = useSelector(state => state.subCategory);
    console.log(sacadata.subCategory);
    const subid = sacadata.subCategory.map(v => v.id);
    console.log(subid);

    const prodata = useSelector(state => state.product);
    console.log(prodata.product);

    // -------- total itempage count --------
    const itemPerPage = 6;

    useEffect(() => {
        setCurrentpage(1);
    }, [search, sort, prodata.product, category])

    //-------- total itempage pege perna select page data show --------
    const PaginationData = (array) => {
        // 0-4
        // 5-9
        // 10-14
        const startIndex = (currentpage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;

        const pData = prodata.product.slice(startIndex, endIndex)

        console.log(startIndex, endIndex, pData);

        // return pData;
        return array.slice(startIndex, endIndex);
    }

    const handlePrev = () => {
        if (currentpage > 1) {
            setCurrentpage(prev => prev - 1)
        }
    }

    const handleNext = (totalpage) => {
        if (currentpage < totalpage) {
            setCurrentpage(prev => prev + 1)
        }
    }



    //-------- Categories search sort item list --------
    const handleFilter = () => {
        let filtered = Array.isArray(prodata.product) ? [...prodata.product] : [];
        console.log(filtered);

        // Categories filtered
        if (category) {
            filtered = filtered.filter((v) => v.categoryId === category);
        }

        //search
        const sData = filtered.filter((v) =>
            v.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
            v.price.toString().includes(search.toLocaleLowerCase())
        );

        //sort
        console.log(sort);
        if (sort === 'az') {
            sData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'za') {
            sData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sort === 'lh') {
            sData.sort((a, b) => a.price - b.price);
        } else if (sort === 'hl') {
            sData.sort((a, b) => b.price - a.price);
        }
        //search-sort-return
        return sData;
    }

    // filtered + sorted
    const fData = handleFilter();

    const totalpage = Math.ceil(fData.length / itemPerPage);
    const pData = PaginationData(fData);




    return (
        <div>
            {'{'}{/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            {/* Single Page Header End */}


            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">

                            {/* search sort item list */}
                            <div className="row g-4">
                                {/* Search productdata */}
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="Search" value={search}
                                            onChange={(e) => setSearch(e.target.value)} />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>

                                {/* clearAll filter */}
                                <div className="col-6">
                                    <span
                                        onClick={() => { setCategory(''); setSearch(''); setSort('') }}
                                        style={{ fontSize: 10 }}
                                    >
                                        (ClearAll <ClearAllIcon />)
                                    </span>
                                </div>

                                {/* sort productdata */}
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-0 form-select-sm bg-light me-3" >
                                            <option value="">sort</option>
                                            <option value="az">A to Z</option>
                                            <option value="za">Z to A</option>
                                            <option value="lh">$ Low to High</option>
                                            <option value="hl">$ High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4">

                                {/* Sidebar Fresh fruits shop */}
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        {/* category head */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories </h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    {cadata.category.map((v) => (
                                                        <li key={v.id}>
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                {/* Add onClick here */}
                                                                <a href="#" onClick={() => setCategory(v.id)}
                                                                    style={{ cursor: 'pointer', color: category === v.id ? '#81c408' : 'black' }}
                                                                >
                                                                    <i className="fas fa-apple-alt me-2" />
                                                                    {v.name}
                                                                </a>
                                                                <span>
                                                                   ({  prodata.product.filter((p) => p.categoryId === v.id).length })
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* price */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput"
                                                    min={0} max={500} defaultValue={0} onInput={(e) => setRangeValue(e.target.value)}
                                                />
                                                <output htmlFor="rangeInput">{rangeValue}</output>
                                            </div>
                                        </div>

                                        {/* additional */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Additional</h4>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-1"> Organic</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-2" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-2"> Fresh</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-3" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-3"> Sales</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-4" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-4"> Discount</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-5" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-5"> Expired</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Featured products */}
                                        <div className="col-lg-12">
                                            <h4 className="mb-3">Featured products</h4>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                                    <img src="img/featur-1.jpg"
                                                        className="img-fluid rounded"
                                                        alt="Featured product"
                                                    />
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
                                                    <img src="img/featur-2.jpg"
                                                        className="img-fluid rounded"
                                                        alt="Featured product"
                                                    />
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
                                                    <img src="img/featur-3.jpg"
                                                        className="img-fluid rounded"
                                                        alt="Product image"
                                                    />
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

                                        {/* fresh fruits banner */}
                                        <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img src="img/banner-fruits.jpg"
                                                    className="img-fluid w-100 rounded"
                                                    alt="Fruits banner"
                                                />
                                                <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">

                                        {/* image & image per subcategory name & image details  */}
                                        <div className="row">
                                            {pData.map((v) => (
                                                <div key={v.id} className="col-md-6 col-lg-6 col-xl-4">
                                                    <NavLink to={'/ShopDetail/' + v.id}>
                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <div style={{ height: '260px', overflow: 'hidden' }} className="img-cover-box">
                                                                    <img
                                                                        src={`../public/img/categoryimg/${v.product_img}`}
                                                                        className="w-100 h-100 object-fit-cover rounded-top"
                                                                        alt="Product image"
                                                                        style={{ objectFit: 'cover' }}
                                                                    />
                                                                </div>
                                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>
                                                                    {sacadata.subCategory.find((sub) => sub.id === v.subcategoryId)?.name || ''}
                                                                </div>
                                                            </div>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                <h3>{v.title}</h3>
                                                                <p>{v.description}</p>
                                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                                        <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
                                                                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                            <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <a href="#" onClick={() => handlePrev()} className="rounded"> « </a>
                                                {
                                                    [...Array(totalpage)].map((_, index) => {
                                                        const pageNo = index + 1;
                                                        console.log(pageNo);

                                                        return (
                                                            <a href="#"
                                                                key={pageNo}
                                                                onClick={() => setCurrentpage(pageNo)}
                                                                className={`rounded ${currentpage === pageNo ? 'active' : ''}`}
                                                            >
                                                                {pageNo}
                                                            </a>
                                                        )
                                                    })
                                                }
                                                <a href="#" onClick={() => handleNext(totalpage)} className="rounded"> » </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Fruits Shop End */}
        </div >
    );
}

export default Shop;