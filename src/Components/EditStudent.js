import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import myContext from './userContext';
import swal from 'sweetalert';

function EditStudent() {
   let navigate = useNavigate()
   const userContext = useContext(myContext);
   let params = useParams();
   useEffect(() => {
         let fetch = async () => {
            try {
                  let fetchStudent = await axios.get(`https://6212758cf43692c9c6eb7113.mockapi.io/day31-students/${params.id}`);
                  formik.setValues(fetchStudent.data)
            } catch (error) {
                  console.log(error);
            }
         }
         fetch();
   }, [])

   const formik = useFormik({
         initialValues: {
            rollNo: "", 
            name: "", 
            class: "",
            age: "",
            attendance: "",
            fatherName: "",
            motherName: "",
            contactNo: "",
         },
         validate: (values) => {
            const errors = {};

            if (!values.rollNo || values.rollNo==0 ) {
                  errors.rollNo="Enter the student Roll Number"
            }
            let index = userContext.students.findIndex((e)=> e.id == params.id)
            let sameRollNo = userContext.students.some((stu,i) => i==index? "" : stu.rollNo == values.rollNo);
            if (sameRollNo) {
                  errors.rollNo="This Roll No. is already allotted, please enter the unique roll No."
            }
            if (!values.name) {
                  errors.name="Name cannot be blank"
            }
            if (values.class<1 || values.class>12) {
                  errors.class="Class cannot be more than 12th std."
            }
            if (!values.age || values.age==0) {
                  errors.age="Age cannot be blank"
            }
            if (!values.attendance || values.attendance<1 || values.attendance>100) {
                  errors.attendance="Attendance should be anywhere from 1 to 100"
            }
            if (!values.fatherName) {
                  errors.fatherName="Enter the father name of the student"
            }
            if (!values.motherName) {
                  errors.motherName="Enter the mother name of the student"
            }
            if (`${values.contactNo}`.length != 10) {
                  errors.contactNo="Contact No. should be 10 digits"
            }
            
            return errors;
         },
          onSubmit: (values) => {
             //   sweet alert to confirm to edit
               swal({
                    title: `Are you sure to edit this student?`,
                    icon: "warning",
                    buttons:{
                         cancel: {
                         text: "Cancel",
                         value: null,
                         visible: true,
                         className: "btn btn-light text-primary",
                         closeModal: true,
                         },
                         confirm: {
                         text: "Edit",
                         value: true,
                         visible: true,
                         className: "btn btn-warning text-dark",
                         closeModal: true
                         }
                    },

                    dangerMode: true,
               })
               .then(async (willEdit) => {
                    if (willEdit) {
          
                        try {
                              await axios.put(`https://6212758cf43692c9c6eb7113.mockapi.io/day31-students/${params.id}`, values)
                              let index = userContext.students.findIndex((obj) => obj.id == params.id);
                              userContext.students.splice(index, 1, values)
                              userContext.setStudents([...userContext.students])
                              formik.resetForm();
                              navigate("/students")  
                              swal(`This student has been edited`, {
                                   icon: "success",
                                   buttons:{ confirm:{className:"btn btn-primary"}}
                              })
                        }  catch (error) {
                              console.log(error);
                              navigate("/students")   
                              swal(`This student was not edited due to some technical issues`, 'Please try after some time', {
                                 icon: "info",
                                 buttons:{ confirm:{className:"btn btn-primary"}}
                              })
                           }                         
                    }
               });
          } 
     })
   
   return (
   <div className='container'>
     <div className='h3 mb-2'>Edit a Student</div>
     <fieldset className='border border-5 border-primary p-3'>
          <form onSubmit={formik.handleSubmit} id="form">
          <div className='row'>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Roll Number</label><span className='text-danger'>*</span>
                    <input type={"number"} className={`form-control border border-${formik.errors.rollNo?"danger":"success"}`} name="rollNo" onChange={formik.handleChange} value={formik.values.rollNo}></input>
                    <span className='text-danger'>{formik.errors.rollNo}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Name</label><span className='text-danger'>*</span>
                    <input className={`form-control border border-${formik.errors.name?"danger":"success"}`} name="name" onChange={formik.handleChange} value={formik.values.name}></input>
                    <span className='text-danger'>{formik.errors.name}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Class</label><span className='text-danger'> *</span>
                    <input type={"number"} className={`form-control border border-${formik.errors.class?"danger":"success"}`} name="class" onChange={formik.handleChange} value={formik.values.class}></input>
                    <span className='text-danger'>{formik.errors.class}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Age</label><span className='text-danger'> *</span>
                    <input type="number" className={`form-control border border-${formik.errors.age?"danger":"success"}`} name="age" onChange={formik.handleChange} value={formik.values.age}></input>
                    <span className='text-danger'>{formik.errors.age}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Attendance (in %)</label><span className='text-danger'> *</span>
                    <input type={"number"} className={`form-control border border-${formik.errors.attendance?"danger":"success"}`} name="attendance"  onChange={formik.handleChange} value={formik.values.attendance}></input>
                    <span className='text-danger'>{formik.errors.attendance}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark fw-bold'>Father's Name</label><span className='text-danger'> *</span>
                    <input type="text" className={`form-control border border-${formik.errors.fatherName?"danger":"success"}`} name="fatherName"  onChange={formik.handleChange} value={formik.values.fatherName}></input>
                    <span className='text-danger'>{formik.errors.fatherName}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark fw-bold'>Mother's Name</label><span className='text-danger'> *</span>
                    <input type="text" className={`form-control border border-${formik.errors.motherName?"danger":"success"}`} name="motherName"  onChange={formik.handleChange} value={formik.values.motherName}></input>
                    <span className='text-danger'>{formik.errors.motherName}</span>            
               </div>
               <div className='col-5 m-3 mx-auto'>
                    <label className='text-dark'>Contact No.</label><span className='text-danger'> *</span>
                    <input type="number" className={`form-control border border-${formik.errors.contactNo?"danger":"success"}`} name="contactNo"  onChange={formik.handleChange} value={formik.values.contactNo}></input>
                    <span className='text-danger'>{formik.errors.contactNo}</span>            
               </div>
          </div>
          <div className='m-3 text-center'>
               <button type='submit' className="d-none d-sm-inline-block btn btn-lg btn-success shadow-sm" disabled={Object.keys(formik.errors).length>0? true:false} >Submit</button>
          </div>
          </form>
     </fieldset>
          <button className="d-none d-sm-inline-block btn btn-md btn-primary shadow-sm mt-2" onClick={()=>{navigate("/students")}}>Back</button>        
       
   </div>
  )
}

export default EditStudent