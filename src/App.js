
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyProvider } from './Components/userContext';
import Sidebar from './Components/Sidebar'
import Topbar from './Components/Topbar';
import Teachers from './Components/Teachers';
import Students from './Components/Students';
import AddStudent from './Components/AddStudent';
import AddTeacher from './Components/AddTeacher';
import EditTeacher from './Components/EditTeacher';
import EditStudent from './Components/EditStudent';
import ViewTeacher from './Components/ViewTeacher';
import ViewStudent from './Components/ViewStudent';


function App() {
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  return (
    <BrowserRouter>
      <div id='page-top'>
        <div id='wrapper'>
          <MyProvider value={{ students, setStudents, teachers, setTeachers }}>
            <Sidebar></Sidebar>
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content"></div>
              <Topbar></Topbar>
              <div className="container-fluid">
                <Routes>
                  <Route path='index.html' element={<Teachers />}/>
                  <Route path="teachers" element={<Teachers />} />
                  <Route path="students" element={<Students />} />
                  <Route path="AddStudent" element={<AddStudent />} />
                  <Route path='AddTeacher' element={<AddTeacher />} />
                  <Route path='edit-teacher/:id' element={<EditTeacher />} />
                  <Route path='edit-student/:id' element={<EditStudent />} />
                  <Route path='view-teacher/:id' element={<ViewTeacher />} />
                  <Route path='view-student/:id' element={<ViewStudent />} />
                </Routes>
              </div>
            </div>
          </MyProvider>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Dhinesh 2023</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
