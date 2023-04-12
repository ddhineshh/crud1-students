import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import myContext from './userContext';

function ViewStudent() {
  let navigate = useNavigate()
   const userContext = useContext(myContext);
   let params = useParams();
  
   let index = userContext.students.findIndex((e)=> e.id == params.id)
   return (
      <div className='m-2'>
         <h1 className='text-secondary'>Details</h1><br/>
         <label className='h3 text-dark'>Roll No :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].rollNo }</span><br/>
         <label className='h3 text-dark'>Name :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].name }</span><br/>
         <label className='h3 text-dark'>Class :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].class }</span><br/>
         <label className='h3 text-dark'>Age :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].age }</span><br/>
         <label className='h3 text-dark'>Attendance :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].attendance }</span><br/>
         <label className='h3 text-dark'>Father Name :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].fatherName }</span><br/>
         <label className='h3 text-dark'>Mother Name :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].motherName }</span><br/>
         <label className='h3 text-dark'>Contact Number :</label> &emsp;
         <span className='h4 text-primary'>{userContext.students[index].contactNo}</span><br /><br />
         <button className="d-none d-sm-inline-block btn btn-md btn-primary shadow-sm mt-2" onClick={()=>{navigate("/students")}}>Back</button>
      </div>
  )
}

export default ViewStudent