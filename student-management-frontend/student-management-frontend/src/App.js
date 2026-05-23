import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  // ✅ YOUR AZURE BACKEND URL
  const API_BASE =
    "https://vamshiapp-fnfjd7bpbmbafvgm.centralindia-01.azurewebsites.net";

  // ================= GET =================
  const getStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/students`);
      setStudents(res.data);
    } catch (error) {
      console.log("GET error:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // ================= ADD =================
  const addStudent = async () => {
    try {
      await axios.post(`${API_BASE}/students`, {
        name,
        email,
        course,
      });

      alert("Student Added");

      setName("");
      setEmail("");
      setCourse("");

      getStudents();
    } catch (error) {
      console.log("POST error:", error);
    }
  };

  // ================= DELETE =================
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_BASE}/students/${id}`);
      getStudents();
    } catch (error) {
      console.log("DELETE error:", error);
    }
  };

  // ================= UPDATE =================
  const updateStudent = async (id) => {
    const updatedName = prompt("Enter Updated Name");
    const updatedEmail = prompt("Enter Updated Email");
    const updatedCourse = prompt("Enter Updated Course");

    if (!updatedName || !updatedEmail || !updatedCourse) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.put(`${API_BASE}/students/${id}`, {
        name: updatedName,
        email: updatedEmail,
        course: updatedCourse,
      });

      getStudents();
    } catch (error) {
      console.log("PUT error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => updateStudent(student.id)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;