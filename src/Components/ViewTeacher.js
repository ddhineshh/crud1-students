import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import myContext from './userContext';

function ViewTeacher() {
  let navigate = useNavigate()
   const userContext = useContext(myContext);
   let params = useParams();
  
   let index = userContext.teachers.findIndex((e)=> e.id == params.id)
   return (
      <div className='m-2'>
         <h1 className='text-secondary'>Details</h1><br/>
         <label className='h3 text-dark'>Name :</label> &emsp;
         <span className='h4 text-primary'>{userContext.teachers[index].name }</span><br/>
         <label className='h3 text-dark'>Subject :</label> &emsp;
         <span className='h4 text-primary'>{userContext.teachers[index].subject }</span><br/>
         <label className='h3 text-dark'>City :</label> &emsp;
         <span className='h4 text-primary'>{userContext.teachers[index].city }</span><br/>
         <label className='h3 text-dark'>Mobile :</label> &emsp;
         <span className='h4 text-primary'>{userContext.teachers[index].mobile }</span><br/>
         <label className='h3 text-dark'>Email :</label> &emsp;
         <span className='h4 text-primary'>{userContext.teachers[index].email }</span><br/>
         <button className="d-none d-sm-inline-block btn btn-md btn-primary shadow-sm mt-2" onClick={()=>{navigate("/teachers")}}>Back</button>
      </div>
  )
}

export default ViewTeacher