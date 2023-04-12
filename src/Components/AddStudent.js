import React, { useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import swal from 'sweetalert'
import myContext from './userContext'
import { Link, useNavigate } from 'react-router-dom'


function AddStudent() {
    let navigate = useNavigate()
    const userContext = useContext(myContext)
    const formik = useFormik({
        initialValues: {
            rollNo: '',
            name: '',
            class: '',
            age: '',
            attendance: "",
            fatherName: "",
            motherName: "",
            contactNo: "",
        },
        validate: (values) => {
            const errors = {}
            if (!values.rollNo || values.rollNo == 0) {
                errors.rollNo = 'Enter the valid student Roll Number'
            }
            let sameRollNo = userContext.students.some((stu) => stu.rollNo == values.rollNo)
            if (sameRollNo) {
                errors.rollNo = 'This Roll No aldready exists.. Please enter new'
            }
            if (!values.name) {
                errors.name = 'Name cannot be blank'
            }
            if (values.class < 1 || values.class > 12) {
                errors.class = "Class cannot be more than 12th std."
            }
            if (!values.age || values.age == 0) {
                errors.age = "Age cannot be blank"
            }
            if (!values.attendance || values.attendance < 1 || values.attendance > 100) {
                errors.attendance = "Attendance should be anywhere from 1 to 100"
            }
            if (!values.fatherName) {
                errors.fatherName = "Enter the father name of the student"
            }
            if (!values.motherName) {
                errors.motherName = "Enter the mother name of the student"
            }
            if (`${values.contactNo}`.length != 10) {
                errors.contactNo = "Contact No. should be 10 digits"
            }
            return errors;
        },
        onSubmit: async (values) => {               
            try {
               await axios.post("https://6212758cf43692c9c6eb7113.mockapi.io/day31-students", values);
               userContext.setStudents([...userContext.students, values])
               formik.resetForm();
               navigate("/students");
               swal({
                  title: `student - ${values.name}`,
                  text: "Succefully Added",
                  icon: "success",
                  buttons:{ confirm:{className:"btn btn-primary"}}
               })
            } catch (error) {
                  console.log(error);
                  navigate("/students")   
                  swal(`This student was not added due to some technical issues`, 'Please try after some time', {
                     icon: "info",
                     buttons:{ confirm:{className:"btn btn-primary"}}
                  })
            }     
         }
    })
    return (
        <div className='container'>
            <div className='h3 mb-2'>Add a Student</div>
            <fieldset className='border border-5 border-primary p-3'>
                <form>
                    <div className='row'>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Roll Number</label><span className='text-danger'>*</span>
                            <input type='number' className={`form-control border border-${formik.errors.rollNo ? 'danger' : 'success'}`} name='rollNo' onChange={formik.handleChange} value={formik.values.rollNo}></input>
                            <span className='text-danger'>{formik.errors.rollNo}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Class</label><span className='text-danger'> *</span>
                            <input type={"number"} className={`form-control border border-${formik.errors.class ? "danger" : "success"}`} name="class" onChange={formik.handleChange} value={formik.values.class}></input>
                            <span className='text-danger'>{formik.errors.class}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Age</label><span className='text-danger'> *</span>
                            <input type="number" className={`form-control border border-${formik.errors.age ? "danger" : "success"}`} name="age" onChange={formik.handleChange} value={formik.values.age}></input>
                            <span className='text-danger'>{formik.errors.age}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Name</label><span className='text-danger'>*</span>
                            <input className={`form-control border border-${formik.errors.name ? "danger" : "success"}`} name="name" onChange={formik.handleChange} value={formik.values.name}></input>
                            <span className='text-danger'>{formik.errors.name}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Attendance (in %)</label><span className='text-danger'> *</span>
                            <input type={"number"} className={`form-control border border-${formik.errors.attendance ? "danger" : "success"}`} name="attendance" onChange={formik.handleChange} value={formik.values.attendance}></input>
                            <span className='text-danger'>{formik.errors.attendance}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark fw-bold'>Father's Name</label><span className='text-danger'> *</span>
                            <input type="text" className={`form-control border border-${formik.errors.fatherName ? "danger" : "success"}`} name="fatherName" onChange={formik.handleChange} value={formik.values.fatherName}></input>
                            <span className='text-danger'>{formik.errors.fatherName}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark fw-bold'>Mother's Name</label><span className='text-danger'> *</span>
                            <input type="text" className={`form-control border border-${formik.errors.motherName ? "danger" : "success"}`} name="motherName" onChange={formik.handleChange} value={formik.values.motherName}></input>
                            <span className='text-danger'>{formik.errors.motherName}</span>
                        </div>
                        <div className='col-5 m-3 mx-auto'>
                            <label className='text-dark'>Contact No.</label><span className='text-danger'> *</span>
                            <input type="number" className={`form-control border border-${formik.errors.contactNo ? "danger" : "success"}`} name="contactNo" onChange={formik.handleChange} value={formik.values.contactNo}></input>
                            <span className='text-danger'>{formik.errors.contactNo}</span>
                        </div>
                    </div>
                    <div className='m-3 text-center'>
                        <button type='submit' className='d-none d-sm-inline-block btn btn-lg btn-success shadow-sm' disabled={Object.keys(formik.errors).length>0? true:false}>Submit</button>
                    </div>
                </form>
            </fieldset>
            <button className="d-none d-sm-inline-block btn btn-md btn-primary shadow-sm mt-2" onClick={()=>{navigate("/students")}}>Back</button>  
        </div>
    )
}

export default AddStudent