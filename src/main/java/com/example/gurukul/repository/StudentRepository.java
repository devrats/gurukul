package com.example.gurukul.repository;

import com.example.gurukul.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long> {

    Student findById(long id);
}
