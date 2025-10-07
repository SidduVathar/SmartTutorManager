package de.hnu.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import de.hnu.Model.Course;
import de.hnu.Model.Professor;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByProfessor(Professor professor);
}