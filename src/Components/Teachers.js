import React, { useContext, useEffect } from 'react'
import myContext from './userContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RowTeachers from './RowTeachers'

function Teachers() {
    const userContext = useContext(myContext)
    useEffect(() => {
        async function fetch() {
            try {
                let response = await axios.get('https://63770e2d5c4777651213077e.mockapi.io/teacher')
                userContext.setTeachers(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">Teachers</h1>
            <div className='card shadow mb-4'>
                <div className="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
                    <h6 className="m-0 font-weight-bold text-primary">List of Teachers</h6>
                    <Link to='./AddTeacher' className='d-none d-sm-inline-block btn btn-md btn-danger shadow-sm'>ADD TEACHER</Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered text-dark " id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr className='text-center'>
                                    <th>Name</th>
                                    <th>Subject</th>
                                    <th>City</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody className='text-dark'>
                                {
                                    userContext.teachers.map((obj) => {
                                        return <RowTeachers data={obj} />
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

export default Teachers