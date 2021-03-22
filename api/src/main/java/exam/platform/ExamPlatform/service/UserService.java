package exam.platform.ExamPlatform.service;

import exam.platform.ExamPlatform.exception.ResourceNotFoundException;
import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.model.UserRole;
import exam.platform.ExamPlatform.repository.ExamRepository;
import exam.platform.ExamPlatform.repository.UserRepository;
import exam.platform.ExamPlatform.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {

    public final static String DEFAULT_ROLE = "ROLE_USER";
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private ExamRepository examRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setUserRoleRepository(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    @Autowired
    public void setExamRepository(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public void addWithDefaultRole(User user) {
        UserRole defaultRole = userRoleRepository.findByRole(DEFAULT_ROLE);
        user.getRoles().add(defaultRole);
        String passwordHash = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordHash);
        userRepository.save(user);
    }

    public User findUserByUsername(String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new ResourceNotFoundException("User not found for username: " + username);
        } else {
            return user;
        }
    }

    public void changeAccountSettings(String firstName, String lastName, User user) throws ResourceNotFoundException {
        user.setFirstName(firstName);
        user.setLastName(lastName);
        userRepository.save(user);
    }

    public void updatePassword(User user, String currentPassword, String newPassword) throws Exception {

        if(passwordEncoder.matches(currentPassword, user.getPassword())) {
            String passwordHash = passwordEncoder.encode(newPassword);
            user.setPassword(passwordHash);
            userRepository.save(user);
        } else {
            throw new Exception("Passwords not match");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
