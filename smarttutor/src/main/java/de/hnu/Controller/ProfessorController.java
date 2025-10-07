package de.hnu.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.hnu.Model.Professor;
import de.hnu.Repository.ProfessorRepository;

@RestController
@RequestMapping("/professors")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> getAllProfessors() {
        return professorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProfessorById(@PathVariable Integer id) {
        System.out.println("Professor with id: " + id + " requested");
        Professor professor = professorRepository.findById(id).orElse(null);
        return ResponseEntity.ok(null == professor ? "Professor not found" : professor);
    }

    @PostMapping
    public Professor createProfessor(@RequestBody Professor professor) {
        return professorRepository.save(professor);
    }

    @PutMapping("/{id}")
    public Professor updateProfessor(@PathVariable Integer id, @RequestBody Professor professorDetails) {
        Professor professor = professorRepository.findById(id).orElseThrow();
        professor.setFirstName(professorDetails.getFirstName());
        professor.setLastName(professorDetails.getLastName());
        professor.setEmail(professorDetails.getEmail());
        professor.setPassword(professorDetails.getPassword());
        return professorRepository.save(professor);
    }

    @DeleteMapping("/{id}")
    public void deleteProfessor(@PathVariable Integer id) {
        professorRepository.deleteById(id);
    }

    
    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody Professor loginRequest) {
    // Professor professor = professorRepository.findByEmail(loginRequest.getEmail());
    // if (professor != null && professor.getPassword().equals(loginRequest.getPassword())) {
    //     return ResponseEntity.ok("Login successful");
    // } else {
    //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    // }
    // }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Professor loginRequest) {
    Professor professor = professorRepository.findByEmail(loginRequest.getEmail());
    if (professor != null && professor.getPassword().equals(loginRequest.getPassword())) {
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "professorId", professor.getId()
        ));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

}