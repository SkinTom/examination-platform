package exam.platform.ExamPlatform.controller;

import exam.platform.ExamPlatform.exception.ResourceNotFoundException;
import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://exam-platform-client.herokuapp.com"})
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<User> getCurrentUser(Principal principal) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(userService.findUserByUsername(principal.getName()));
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUserByUsername(@Valid @PathVariable(value = "username") String username) {
        User user = null;
        try {
            user = userService.findUserByUsername(username);
        } catch (ResourceNotFoundException e) {
        }

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        userService.addWithDefaultRole(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/account")
    public Map<String, Boolean> updateAccount(@RequestBody User user, String firstName, String lastName) throws ResourceNotFoundException {
        userService.changeAccountSettings(firstName, lastName, user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Account data updated", Boolean.TRUE);
        return response;
    }

    @PutMapping("/users/password")
    public Map<String, Boolean> updatePassword(@RequestBody User user, String currentPassword, String newPassword) throws Exception {
        Map<String, Boolean> response = new HashMap<>();
        userService.updatePassword(user, currentPassword, newPassword);
        response.put("Password updated", Boolean.TRUE);
        return response;
    }
}
