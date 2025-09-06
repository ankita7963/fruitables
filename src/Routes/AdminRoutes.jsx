import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../AdminRoutes/containers/Category/Category';
import SubCategory from '../AdminRoutes/containers/SubCategory/SubCategory';
import F404 from '../containers/F404/F404';
import Layout from '../AdminRoutes/component/Layout/Layout';
import Counter from '../AdminRoutes/containers/Counter/Counter';
import Product from '../AdminRoutes/containers/Product/Product';
import Review from '../AdminRoutes/containers/Review/Review';


function AdminRoutes(props) {
    return (
        <Layout>

            <Routes>
                <Route path="/Category" element={<Category />} />
                <Route path="/SubCategory" element={<SubCategory />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/review" element={<Review />} />
                <Route path="/Counter" element={<Counter />} />

                {/* -------- path name mistake arror -------- */}
                <Route path="*" element={<F404 />} />
            </Routes>

        </Layout>
    );
}

export default AdminRoutes;