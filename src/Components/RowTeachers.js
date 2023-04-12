import React, { useContext } from 'react'
import swal from 'sweetalert'
import myContext from './userContext'
import axios from 'axios'
import viewIcon from './svgIcons/view.svg'
import editIcon from './svgIcons/edit.svg'
import deleteIcon from './svgIcons/delete.svg'
import { Link } from 'react-router-dom'

function RowTeachers(props) {
    const userContext = useContext(myContext)
    let handleDelete = async (teacher) =>{
        swal({
            title:`Are you sure want to delete teacher ${teacher.name}?`,
            text:'Once deleted it wont be recovered',
            icon:'error',
            buttons:{
                cancel:{
                    text:'Cancel',
                    value:null,
                    visible:true,
                    className:'btn btn-light text-primary',
                    closeModal:true,
                },
                confirm: {
                  text: "Delete",
                  value: true,
                  visible: true,
                  className: "btn btn-danger",
                  closeModal: true
                }
            },
            dangerMode: true,
        })
        .then(async (willDelete) =>{
            if(willDelete){
                try{
                    await axios.delete(`https://63770e2d5c4777651213077e.mockapi.io/teacher/${teacher.id}`)
                    let index = userContext.teachers.findIndex((obj) => obj.id == teacher.id)
                    userContext.teachers.splice(index,1)
                    userContext.setTeachers([...userContext.teachers])
                    swal(`Teacher ${teacher.name} has been deleted`,{
                        icon:'success',
                        buttons:{confirm:{className:'btn btn-primary'}}
                    })
                }catch (error){
                    console.log(error);
                    swal(`Teacher ${teacher.name} has not been deleted. Please try again after sometime`,
                    {
                        icon:'info',
                        buttons:{confirm:{className:'btn btn-primary'}}
                    })
                }
            }
        })
    }
  return (
    <>
        <tr className='text-center text-secondary my-font'>
            <td>{props.data.name}</td>
            <td>{props.data.subject}</td>
            <td>{props.data.city}</td>
            <td>{props.data.mobile}</td>
            <td>{props.data.email}</td>
            <td className='d-flex'>
                <Link to={`/view-teacher/${props.data.id}`}><button className='border border-1 border-dark rounded-pill bg-light m-1'><img src={viewIcon} className='m-1'></img></button></Link>
                <Link to={`/edit-teacher/${props.data.id}`}><button className='border border-1 border-dark rounded-pill bg-light m-1'><img src={editIcon} className='m-1'></img></button></Link>
                <button className='border border-1 border-danger rounded-pill bg-light m-1' onClick={()=>handleDelete(props.data)}><img src={deleteIcon} className='m-1'></img></button>
            </td>
        </tr>
    </>
  )
}

export default RowTeachers