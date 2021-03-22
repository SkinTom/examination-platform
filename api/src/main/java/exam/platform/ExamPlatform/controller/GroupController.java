package exam.platform.ExamPlatform.controller;

import exam.platform.ExamPlatform.exception.ResourceNotFoundException;
import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.model.UserGroup;
import exam.platform.ExamPlatform.repository.UserGroupRepository;
import exam.platform.ExamPlatform.repository.UserRepository;
import exam.platform.ExamPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/groups")
@CrossOrigin(origins = {"http://localhost:4200", "https://exam-platform-client.herokuapp.com"})
public class GroupController {

    private UserGroupRepository userGroupRepository;
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public void setUserGroupRepository(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserGroup> getAllUserGroups(Principal principal) {
        User currentUser = userRepository.findByUsername(principal.getName());
        return userGroupRepository.findByUser(currentUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserGroup> getUserGroupById(@Valid @PathVariable(value = "id") Long groupId) throws ResourceNotFoundException {
        UserGroup group = userGroupRepository.findById(groupId).orElseThrow(() -> new ResourceNotFoundException("Group not found for id: " + groupId));
        return ResponseEntity.ok().body(group);
    }

    @PostMapping
    public UserGroup createGroup(@Valid @RequestBody UserGroup group, Principal principal) {
        User currentUser = userRepository.findByUsername(principal.getName());
        group.setUser(currentUser);
        return userGroupRepository.save(group);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGroupById(@Valid @PathVariable(value = "id") Long groupId) throws ResourceNotFoundException {
        UserGroup group = userGroupRepository.findById(groupId).orElseThrow(() -> new ResourceNotFoundException("Group not found for id: " + groupId));
        userGroupRepository.delete(group);
        Map<String, Boolean> response = new HashMap<>();
        response.put("group deleted", Boolean.TRUE);
        return response;
    }

    @PatchMapping("/members")
    public Map<String, Boolean> addMemberToGroup(Long groupId, String username, Principal principal) throws ResourceNotFoundException {
        Map<String, Boolean> response = new HashMap<>();

        if(username.equals(principal.getName())) throw new ResourceNotFoundException("You cannot add yourself to the group");

        UserGroup group = userGroupRepository.findById(groupId).orElseThrow(() -> new ResourceNotFoundException("Group not found for id: " + groupId));
        User user = userService.findUserByUsername(username);
        group.getMembers().add(user);
        userGroupRepository.save(group);
        response.put("The user has been added to the group", Boolean.TRUE);
        return response;
    }

    @DeleteMapping("/members/{id}")
    public Map<String, Boolean> removeMemberFromGroup(@Valid @PathVariable(value = "id") Long userId, Long groupId) throws ResourceNotFoundException {
        Map<String, Boolean> response = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found for id: " + userId));
        UserGroup group = userGroupRepository.findById(groupId).orElseThrow(() -> new ResourceNotFoundException("Group not found for id: " + groupId));
        group.getMembers().remove(user);
        userGroupRepository.save(group);
        response.put("The user has been removed from the group", Boolean.TRUE);
        return response;
    }
}
