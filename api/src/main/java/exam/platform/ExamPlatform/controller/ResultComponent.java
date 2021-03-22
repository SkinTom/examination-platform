package exam.platform.ExamPlatform.controller;

import exam.platform.ExamPlatform.exception.ResourceNotFoundException;
import exam.platform.ExamPlatform.exception.ResultAlreadyExistException;
import exam.platform.ExamPlatform.model.Exam;
import exam.platform.ExamPlatform.model.Result;
import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.repository.ExamRepository;
import exam.platform.ExamPlatform.repository.ResultRepository;
import exam.platform.ExamPlatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/results")
@CrossOrigin(origins = {"http://localhost:4200", "https://exam-platform-client.herokuapp.com"})
public class ResultComponent {

    private ResultRepository resultRepository;
    private UserService userService;
    private ExamRepository examRepository;

    @Autowired
    public void setResultRepository(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @Autowired
    public void setUserRepository(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setExamRepository(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @GetMapping
    public List<Result> getResultByUserId(Principal principal) throws ResourceNotFoundException {
        User currentUser = userService.findUserByUsername(principal.getName());
        return resultRepository.findByUser(currentUser);
    }

    @GetMapping("/exam/{id}")
    public List<Result> getResultsByExam(@Valid @PathVariable(value = "id") Long examId) throws ResourceNotFoundException {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        return resultRepository.findByExam(exam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@Valid @PathVariable (value = "id") Long resultId) throws ResourceNotFoundException {
        Result result = resultRepository.findById(resultId).orElseThrow(() -> new ResourceNotFoundException("Result not found for id: " + resultId));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public ResponseEntity<Result> createResult(@Valid @RequestBody Result result) {
        if(!(resultRepository.existsByUserAndExam(result.getUser(), result.getExam()))) {
            resultRepository.save(result);
        }
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/{username}/{examId}")
    public ResponseEntity<Result> createResultByUsername(
            @PathVariable (value = "username") String username,
            @PathVariable (value = "examId") Long examId,
            Principal principal) throws ResourceNotFoundException, ResultAlreadyExistException {

        if(username.equals(principal.getName())) throw new ResourceNotFoundException("The result cannot be shared with the owner");
        User user = userService.findUserByUsername(username);
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));

        if(resultRepository.existsByUserAndExam(user, exam)) {
            throw new ResultAlreadyExistException("The exam has already been shared with this user");
        }

        Result result = new Result();
        result.setExam(exam);
        result.setUser(user);
        result.setCompleted(false);
        resultRepository.save(result);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    public ResponseEntity<Result> updateResult(@Valid @RequestBody Result result) throws ResourceNotFoundException {
        Result resultToUpdate = resultRepository.findById(result.getId()).orElseThrow(() -> new ResourceNotFoundException("Result not found for id: " + result.getId()));
        resultToUpdate.setCompleted(result.isCompleted());
        resultToUpdate.setPoints(result.getPoints());
        resultToUpdate.setMaxPoints(result.getMaxPoints());
        resultToUpdate.setPercent(result.getPercent());
        resultToUpdate.setCorrectAnswers(result.getCorrectAnswers());
        resultToUpdate.setIncorrectAnswers(result.getIncorrectAnswers());
        resultRepository.save(resultToUpdate);
        return ResponseEntity.ok().body(resultToUpdate);
    }
}
