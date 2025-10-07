package de.hnu.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import de.hnu.Model.CourseParticipant;

public interface CourseParticipantRepository extends JpaRepository<CourseParticipant, Long> {
}