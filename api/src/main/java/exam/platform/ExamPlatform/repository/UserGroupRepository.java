package exam.platform.ExamPlatform.repository;

import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByUser(User user);
}
