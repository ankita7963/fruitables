import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../redux/Slice/product.slice';
import { useParams } from 'react-router-dom';
import Product from '../../AdminRoutes/containers/Product/Product';
import reducer from '../../redux/Slice/category.slice';
import { getFav, removeFav } from '../../redux/Slice/fav.slice';

function Favorite(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getFav('ghjghj'))
    }, []);

    const favData = useSelector(state => state.fav); // access the cart array


    const producData = useSelector(state => state.product);
    console.log(favData, producData);

    const fData = favData.fav?.fav?.map((v) => {

        const product = producData?.product?.find((v1) => v1.id == v.id);
        console.log(product);

        console.log({ ...Product, qty: v.qty });

        return { ...product, qty: v.qty };

    })

    console.log(fData);




    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Favorite</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Favorite</li>
                </ol>
            </div>


            {/* Single Page Header End */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>

                                {fData?.map((v) => (
                                    <tr key={v.id}>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={`../public/img/categoryimg/${v.product_img}`}
                                                    className="img-fluid me-5 "
                                                    style={{ width: 80, height: 80 }}
                                                    alt={v.title}
                                                />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{v.title}</p>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => dispatch(removeFav(v.id))}
                                                className="btn btn-md rounded-circle bg-light border mt-4">
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div >
            </div >
            {/* Cart Page End */}

        </div >
    );
}

export default Favorite;