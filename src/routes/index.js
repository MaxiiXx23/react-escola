import React from "react";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from "./RequireAuth";

import Login from "../pages/login";
import Photos from "../pages/Photos";
import Register from "../pages/Register";
import Students from '../pages/Students';
import Student from "../pages/Student";
import Page404 from "../pages/Page404";
import EditUser from "../pages/EditUser";

export default function RoutesApp() {
    return (
        <Routes>
            <Route index path="/" element={<Students  />} />
            <Route  path="/student/:id/edit" element={<RequireAuth isClosed> <Student  /></RequireAuth>} />
            <Route  path="/student/" element={<RequireAuth isClosed > <Student  /></RequireAuth>} />
            <Route  path="/photos/:id" element={<RequireAuth isClosed ><Photos/></RequireAuth>} />
            
            <Route path="/register/" element={<Register />} />
            <Route path="/editUser/" element={ <RequireAuth isClosed ><EditUser/></RequireAuth>}>
            </Route>
            <Route path="/login/" element={<Login />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}