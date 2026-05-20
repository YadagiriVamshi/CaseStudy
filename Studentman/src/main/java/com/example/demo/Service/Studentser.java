package com.example.demo.Service;

import com.example.demo.Entity.Student123;
import com.example.demo.Repo.Studentrey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Studentser {

    @Autowired
    private Studentrey repository;

    // ADD STUDENT
    public Student123 addStudent(Student123 student) {
        return repository.save(student);
    }

    // GET ALL STUDENTS
    public List<Student123> getStudents() {
        return repository.findAll();
    }

    // UPDATE STUDENT
    public Student123 updateStudent(Long id, Student123 student) {

        Student123 existingStudent =
                repository.findById(id).orElse(null);

        if(existingStudent != null) {

            existingStudent.setName(student.getName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setCourse(student.getCourse());

            return repository.save(existingStudent);
        }

        return null;
    }

    // DELETE STUDENT
    public String deleteStudent(Long id) {

        repository.deleteById(id);

        return "Student Deleted Successfully";
    }
}