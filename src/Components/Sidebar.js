import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <ul className='navbar-nav bg-gradient-dark sidebar sidebar-dark accordion' id='accordionSidebar'>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Student Teacher Panel</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <div className="sidebar-heading">
                RECORDS
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/teachers">
                    <i className="fas fa-fw fa-table"></i>
                    <span>TEACHERS</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/students">
                    <i className="fas fa-fw fa-table"></i>
                    <span>STUDENTS</span></Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block"/>
            <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id={"sidebarToggle"}></button>
            </div>
        </ul>
    )
}

export default Sidebar