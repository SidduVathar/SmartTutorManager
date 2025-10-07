package de.hnu.Model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Course {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private String courseId;
    private String courseDescription;
    private Date courseStartDate;
    private Date courseEndDate;
    private String courseProgramName;
    private int courseEcts;
    private String courseFrequency;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    
    //added by divya to avoid looping
    @JsonBackReference
    
    private Professor professor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseParticipant> participants;

    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public Date getCourseStartDate() {
        return courseStartDate;
    }

    public void setCourseStartDate(Date courseStartDate) {
        this.courseStartDate = courseStartDate;
    }

    public Date getCourseEndDate() {
        return courseEndDate;
    }

    public void setCourseEndDate(Date courseEndDate) {
        this.courseEndDate = courseEndDate;
    }

    public String getCourseProgramName() {
        return courseProgramName;
    }

    public void setCourseProgramName(String courseProgramName) {
        this.courseProgramName = courseProgramName;
    }

    public int getCourseEcts() {
        return courseEcts;
    }

    public void setCourseEcts(int courseEcts) {
        this.courseEcts = courseEcts;
    }

    public String getCourseFrequency() {
        return courseFrequency;
    }

    public void setCourseFrequency(String courseFrequency) {
        this.courseFrequency = courseFrequency;
    }



    public Professor getProfessor() {
        return professor;
    }



    public List<CourseParticipant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<CourseParticipant> participants) {
        this.participants = participants;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
}