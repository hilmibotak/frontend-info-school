import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectList from "./pages/SubjectList";
import StudentList from "./pages/StudentList";
import TeacherList from "./pages/TeacherList";
import ScheduleList from "./pages/ScheduleList";
import Dashboard from "./pages/Dashboard";
import ClassList from "./pages/ClassList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/schedules" element={<ScheduleList />} />
        <Route path="/classes" element={<ClassList />} />
        
      </Routes>
    </Router>
  );
}

export default App;
