import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import myContext from './userContext'
import RowStudents from './RowStudents'

function Students() {
    const userContext = useContext(myContext)
    useEffect(() => {
        async function fetch() {
            try {
                let datas = await axios.get("https://6212758cf43692c9c6eb7113.mockapi.io/day31-students")
                userContext.setStudents(datas.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Students</h1>
            <div className="card shadow mb-4">
            <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
                <h6 className="m-0 font-weight-bold text-primary">List of Students</h6>
                <Link to="/AddStudent" className="d-none d-sm-inline-block btn btn-md btn-success shadow-sm">Add Student</Link>
            </div>
            <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered text-dark " id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr className='text-center'>
                                <th>Roll Number</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Age</th>
                                <th>Attendance</th>
                                <th>Father's Name</th>
                                <th>Mother's Name</th>
                                <th>Contact No.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                          <tbody className='text-dark'>
                            {
                              userContext.students.map((obj) => {
                                    return <RowStudents data={obj}/>
                                })     
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Students