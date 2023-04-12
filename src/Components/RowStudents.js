import React, { useContext } from 'react'
import swal from 'sweetalert'
import myContext from './userContext'
import axios from 'axios'
import viewIcon from './svgIcons/view.svg';
import editIcon from './svgIcons/edit.svg';
import deleteIcon from './svgIcons/delete.svg';
import { Link } from 'react-router-dom';


function RowStudents(props) {
    const userContext = useContext(myContext);
    let handleDelete = async (student) =>{
        swal({
            title:`Are you sure want to delete student ${student.name}?`,
            text:'Once deleted it wont be recovered',
            icon: "error",
        buttons:{
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            className: "btn btn-light text-primary",
            closeModal: true,
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
                    await axios.delete(`https://6212758cf43692c9c6eb7113.mockapi.io/day31-students/${student.id}`)
                    let index = userContext.students.findIndex((obj) => obj.id == student.id)
                    userContext.students.splice(index, 1)
                    userContext.setStudents([...userContext.students])
                    swal(`Student ${student.name} has been deleted!`,{
                        icon: 'success',
                        buttons: { confirm:{className:'btn btn-primary'}}
                    })
                }catch (error){
                    console.log(error);
                    swal(`Student ${student.name} has not been deleted due to some technical issues`,'Please try after some time',{
                        icon:'info',
                        buttons:{ confirm:{className:'btn btn-primary'}}
                    })
                }
            }
        })
    }
  return (
    <>
    <tr  className='text-center text-secondary my-font '>
        <td>{props.data.rollNo}</td>
        <td>{props.data.name}</td>
        <td>{props.data.class}</td>
        <td>{props.data.age}</td>
        <td>{props.data.attendance} %</td>
        <td>{props.data.fatherName}</td>
        <td>{props.data.motherName}</td>
        <td>{props.data.contactNo}</td>
        <td className='d-flex'>
        <Link to={`/view-student/${props.data.id}`}><button className='border border-1 border-primary rounded-pill bg-light m-1'><img src={viewIcon} className='m-1'></img></button></Link>
        <Link to={`/edit-student/${props.data.id}`}><button className='border border-1 border-dark rounded-pill bg-light m-1'><img src={editIcon} className='m-1'></img ></button></Link>
        <button className='border border-1 border-danger rounded-pill bg-light m-1' onClick={()=>handleDelete(props.data)}><img src={deleteIcon} className='m-1'></img></button>
        </td>
    </tr>
    </>
  )
}

export default RowStudents