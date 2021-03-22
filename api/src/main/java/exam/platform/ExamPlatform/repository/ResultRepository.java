package exam.platform.ExamPlatform.repository;

import exam.platform.ExamPlatform.model.Exam;
import exam.platform.ExamPlatform.model.Result;
import exam.platform.ExamPlatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUser(User user);
    List<Result> findByExam(Exam exam);
    boolean existsByUserAndExam(User user, Exam exam);
}
