import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import swal from 'sweetalert'
import myContext from './userContext';
import { Link, useNavigate } from 'react-router-dom';
function AddTeacher() {
    let navigate = useNavigate()
    const userContext = useContext(myContext);
    const formik = useFormik({
        initialValues: {
            name: "",
            subject: "",
            city: "",
            mobile: "",
            email: "",

        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "Name cannot be blank"
            }
            if (!values.subject) {
                errors.subject = "Subject cannot be blank"
            }

            if (!values.city) {
                errors.city = "City cannot be blank"
            }
            if (!values.mobile) {
                errors.mobile = "Mobile cannot be blank"
            }
            if (!values.email) {
                errors.email="Email cannot be blank"
           }


            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://63770e2d5c4777651213077e.mockapi.io/teacher", values);
                userContext.setTeachers([...userContext.teachers, values])
                formik.resetForm();
                navigate("/teachers")
                swal({
                    title: `Teacher - ${values.name}`,
                    text: "Succefully Added",
                    icon: "success",
                    buttons: { confirm: { className: "btn btn-primary" } }
                })
            } catch (error) {
                console.log(error);
                navigate("/teachers")
                swal(`This teacher was not added due to some technical issues`, 'Please try after some time', {
                    icon: "info",
                    buttons: { confirm: { className: "btn btn-primary" } }
                })
            }
        }
    })
    return (
        <div className='container'>
            <div className='h3 mb-2'>Add a Teacher</div>
            <fieldset className='border border-5 border-primary p-3'>
                <form onSubmit={formik.handleSubmit} id="form">
                    <div className='row'>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Name</label><span className='text-danger'>*</span>
                            <input className={`form-control border border-${formik.errors.name ? "danger" : "success"}`} name="name" onChange={formik.handleChange} value={formik.values.name}></input>
                            <span className='text-danger'>{formik.errors.name}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Subject</label><span className='text-danger'> *</span>
                            <input className={`form-control border border-${formik.errors.subject ? "danger" : "success"}`} name="subject" onChange={formik.handleChange} value={formik.values.subject}></input>
                            <span className='text-danger'>{formik.errors.subject}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>City</label>
                            <input  className={`form-control border border-${formik.errors.city ? "danger" : "success"}`} name="city" onChange={formik.handleChange} value={formik.values.city}></input>
                            <span className='text-danger'>{formik.errors.city}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Mobile</label><span className='text-danger'> *</span>
                            <input className={`form-control border border-${formik.errors.mobile ? "danger" : "success"}`} name="mobile" onChange={formik.handleChange} value={formik.values.mobile}></input>
                            <span className='text-danger'>{formik.errors.mobile}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark fw-bold'>Email</label><span className='text-danger'> *</span>
                            <input  className={`form-control border border-${formik.errors.email ? "danger" : "success"}`} name="email" onChange={formik.handleChange} value={formik.values.email}></input>
                            <span className='text-danger'>{formik.errors.email}</span>
                        </div>
                    </div>
                    <div className='m-3 text-center'>
                        <button type='submit' className="d-none d-sm-inline-block btn btn-lg btn-success shadow-sm" disabled={Object.keys(formik.errors).length > 0 ? true : false} >Submit</button>
                    </div>
                </form>
            </fieldset>
            <button className="d-none d-sm-inline-block btn btn-md btn-primary shadow-sm mt-2" onClick={() => { navigate("/teachers") }}>Back</button>

        </div>
    )
}

export default AddTeacher