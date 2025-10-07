package de.hnu.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import de.hnu.Model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> {
    Professor findByEmail(String email);
}
