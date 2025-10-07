import { useFormik } from 'formik';
import React, { useState } from 'react';
import { object, string } from 'yup';

function Auth(props) {
    const [type, setType] = useState('Login');

    let initialValues = {};
    let formikuse = {};

    if (type === "Login") {
        initialValues = {
            email: '',
            password: '',
        }
        formikuse = {
            email: string().required().email(),
            password: string().required(),
        }

    } else if (type === "Registration") {
        console.log("ggg");

        initialValues = {
            name: '',
            email: '',
            password: '',
        }
        formikuse = {
            name: string().required(),
            email: string().required().email(),
            password: string().required(),
        }
    } else if (type === "ForgotPassword") {
        initialValues = {
            email: '',
        }
        formikuse = {
            email: string().required().email(),
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: object(formikuse),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    console.log(initialValues);
    console.log(formikuse);

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    console.log(errors, touched);





    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {/* {type === 'Login' ? 'Login' : 'Registration'} */}
                    {type === 'Login' ? 'Login' : type === 'Registration' ? 'Registration' : 'Forgot Password'}
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active text-white"> {type} </li>
                </ol>
            </div>

            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">
                                        {type === 'Login' ? 'Login' : type === 'Registration' ? 'Register' : 'Forgot Password'}

                                    </h1>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <form onSubmit={handleSubmit}>
                                    {type === 'Registration' ?
                                        <>
                                            <input
                                                type="text"
                                                name='name'
                                                className="w-100 form-control border-0 py-3 mb-4"
                                                placeholder="Your Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {
                                                touched.name && errors.name ? <span className='error'>{errors.name}</span> : null
                                            }
                                        </>
                                        :
                                        null
                                    }

                                    <input
                                        type="email"
                                        name='email'
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        placeholder="Enter Your Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {
                                        touched.email && errors.email ? <span className='error'>{errors.email}</span> : null
                                    }

                                    {type !== 'ForgotPassword' ?
                                        <>
                                            <input
                                                type="password"
                                                name='password'
                                                className="w-100 form-control border-0 py-3 mb-4"
                                                placeholder="Enter Your Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {
                                                touched.password && errors.password ? <span className='error'>{errors.password}</span> : null
                                            }
                                        </>
                                        :
                                        null
                                    }

                                    <button
                                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>

                                {/* {type === 'Login' ?
                                    (
                                        <>
                                            <span>Create Ragiter Account</span>
                                            <a href="#" onClick={() => setType('Registration')}> Ragiter</a>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <span>Already have a Login</span>
                                            <a href="#" onClick={() => setType('Login')}> Login</a>
                                        </>
                                    )
                                } */}

                                {type === 'Login' && (
                                    <>
                                        <span>Don't have an account?</span>
                                        <a href="#" onClick={() => setType('Registration')}> Register </a>

                                        <br />

                                        <span>Forgot your password?</span>
                                        <a href="#" onClick={() => setType('ForgotPassword')}> Reset </a>

                                    </>
                                )}

                                {type === 'Registration' && (
                                    <>
                                        <span>Already have an account?</span>
                                        <a href="#" onClick={() => setType('Login')}> Login </a>
                                    </>
                                )}

                                {type === 'ForgotPassword' && (
                                    <>
                                        <span>Back to</span>
                                        <a href="#" onClick={() => setType('Login')}> Login </a>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;

