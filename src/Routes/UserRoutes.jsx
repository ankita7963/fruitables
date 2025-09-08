import React from 'react';
// import Header from '../component/header/header';
import { Route, Routes } from 'react-router-dom';
import Home from '../containers/Home/Home';
import Contact from '../containers/Contact/Contact';
import Footer from '../component/Footer/Footer';
import PrivateRoutes from './PrivateRoutes';
import F404 from '../containers/F404/F404';
import Shop from '../containers/Shop/Shop';
import ShopDetail from '../containers/ShopDetail/ShopDetail';
import Cart from '../containers/Cart/Cart';
import Chackout from '../containers/Chackout/Chackout';
import Testimonial from '../containers/Testimonial/Testimonial';
import Header from '../component/Header/Header';
import Favorite from '../containers/Favorite/Favorite';

function UserRoutes(props) {
    return (

        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<PrivateRoutes />}>
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:id" element={<Shop />} />
                    <Route path="/ShopDetail/:id" element={<ShopDetail />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/Favorite" element={<Favorite />} />
                    <Route path="/Chackout" element={<Chackout />} />
                    <Route path="/Testimonial" element={<Testimonial />} />
                    <Route path="/F404" element={<F404 />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Contact/:id" element={<Contact />} />
                </Route>

                {/* -------- path name mistake arror -------- */}
                <Route path="*" element={<F404 />} />
            </Routes>

            <Footer />
        </>

    );
}

export default UserRoutes;