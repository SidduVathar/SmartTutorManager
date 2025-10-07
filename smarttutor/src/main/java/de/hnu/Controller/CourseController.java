package de.hnu.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.hnu.Model.Course;
import de.hnu.Model.CourseParticipant;
import de.hnu.Model.Professor;
import de.hnu.Repository.CourseParticipantRepository;
import de.hnu.Repository.CourseRepository;
import de.hnu.Repository.ProfessorRepository;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private CourseParticipantRepository courseParticipantRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    @PostMapping("/{professorId}")
    public Course createCourse(@PathVariable Integer professorId, @RequestBody Course course) {
        Professor professor = professorRepository.findById(professorId).orElseThrow();
        course.setProfessor(professor);
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setCourseName(courseDetails.getCourseName());
        course.setCourseId(courseDetails.getCourseId());
        course.setCourseDescription(courseDetails.getCourseDescription());
        course.setCourseStartDate(courseDetails.getCourseStartDate());
        course.setCourseEndDate(courseDetails.getCourseEndDate());
        course.setCourseProgramName(courseDetails.getCourseProgramName());
        course.setCourseEcts(courseDetails.getCourseEcts());
        course.setCourseFrequency(courseDetails.getCourseFrequency());
        return courseRepository.save(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }

    @PostMapping("/{courseId}/participants")
    public CourseParticipant addParticipant(@PathVariable Long courseId, @RequestBody CourseParticipant participant) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        participant.setCourse(course);
        return courseParticipantRepository.save(participant);
    }

    @GetMapping("/{courseId}/participants")
    public List<CourseParticipant> getParticipants(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        return course.getParticipants();
    }

    //fetch courses by professor ID: added by divya 
    @GetMapping("/professor/{professorId}")
    public List<Course> getCoursesByProfessorId(@PathVariable Integer professorId) {
        Professor professor = professorRepository.findById(professorId).orElseThrow();
        return courseRepository.findByProfessor(professor);
    }


    
}