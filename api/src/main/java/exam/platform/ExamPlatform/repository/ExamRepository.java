package exam.platform.ExamPlatform.repository;

import exam.platform.ExamPlatform.model.Exam;
import exam.platform.ExamPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByUser(User user);
}
