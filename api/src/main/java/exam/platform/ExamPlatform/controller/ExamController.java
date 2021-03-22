package exam.platform.ExamPlatform.controller;

import exam.platform.ExamPlatform.exception.ResourceNotFoundException;
import exam.platform.ExamPlatform.model.Answer;
import exam.platform.ExamPlatform.model.Exam;
import exam.platform.ExamPlatform.model.Question;
import exam.platform.ExamPlatform.model.User;
import exam.platform.ExamPlatform.repository.AnswerRepository;
import exam.platform.ExamPlatform.repository.ExamRepository;
import exam.platform.ExamPlatform.repository.QuestionRepository;
import exam.platform.ExamPlatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/exams")
@CrossOrigin(origins = {"http://localhost:4200", "https://exam-platform-client.herokuapp.com"})
public class ExamController {

    private ExamRepository examRepository;
    private QuestionRepository questionRepository;
    private UserRepository userRepository;
    private AnswerRepository answerRepository;

    @Autowired
    public ExamController(ExamRepository examRepository, QuestionRepository questionRepository, UserRepository userRepository, AnswerRepository answerRepository) {
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.answerRepository = answerRepository;
    }

    @GetMapping
    public List<Exam> getAllUserExams(Principal principal) {
        User currentUser = userRepository.findByUsername(principal.getName());
        //return examRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return examRepository.findByUser(currentUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@Valid @PathVariable(value = "id") Long examId) throws ResourceNotFoundException {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        return ResponseEntity.ok().body(exam);
    }

    @PostMapping
    public Exam createExam(@Valid @RequestBody Exam exam, Principal principal) {
        User currentUser = userRepository.findByUsername(principal.getName());
        exam.setUser(currentUser);
        return examRepository.save(exam);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@Valid @PathVariable(value = "id") Long examId,
                                           @Valid @RequestBody Exam exam) throws ResourceNotFoundException {

        Exam examToUpdate = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        examToUpdate.setName(exam.getName());
        examToUpdate.setEnableTime(exam.getEnableTime());
        examToUpdate.setTime(exam.getTime());
        examToUpdate.setStatus(exam.getStatus());
        examToUpdate.setRandomQuestion(exam.isRandomQuestion());
        examToUpdate.setRandomAnswers(exam.isRandomAnswers());
        examToUpdate.setQuestionCollection(exam.isQuestionCollection());
        examToUpdate.setNumberQuestionCollection(exam.getNumberQuestionCollection());
        examToUpdate.setQuestions(exam.getQuestions());
        final Exam updatedExam = examRepository.save(examToUpdate);
        return ResponseEntity.ok(updatedExam);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteExamById(@Valid @PathVariable(value = "id") Long examId) throws ResourceNotFoundException {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        examRepository.delete(exam);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exam deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/{id}/questions")
    public List<Question> getAllQuestions(@Valid @PathVariable(value = "id") long examId) throws ResourceNotFoundException {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        return exam.getQuestions();
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<Question> getQuestionById(@Valid @PathVariable(value = "id") long questionId) throws ResourceNotFoundException {

        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Question not found for id: " + questionId));
        return ResponseEntity.ok().body(question);
    }

    @PostMapping("/{id}/questions")
    public ResponseEntity<Question> createQuestion(@Valid @PathVariable(value = "id") Long examId,
                                   @Valid @RequestBody Question question) throws ResourceNotFoundException {

        Exam exam = examRepository.findById(examId).orElseThrow(() -> new ResourceNotFoundException("Exam not found for id: " + examId));
        question.setExam(exam);
        questionRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<Question> updateQuestion(@Valid @PathVariable(value = "id") Long questionId,
                                                   @Valid @RequestBody Question question) throws ResourceNotFoundException {
        Question questionToUpdate = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Question not found for id: " + questionId));
        questionToUpdate.setQuestion(question.getQuestion());
        questionToUpdate.setPoints(question.getPoints());
        questionToUpdate.setAnswers(question.getAnswers());

        final Question updatedQuestion = questionRepository.save(questionToUpdate);
        return ResponseEntity.ok().body(updatedQuestion);
    }

    @DeleteMapping("/questions/{id}")
    public Map<String, Boolean> deleteQuestion(@Valid @PathVariable(value = "id") Long questionId) throws ResourceNotFoundException {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new ResourceNotFoundException("Question not found for id: " + questionId));
        questionRepository.delete(question);
        Map<String, Boolean> response = new HashMap<>();
        response.put("question deleted", Boolean.TRUE);
        return response;
    }

    @DeleteMapping("/answers/{id}")
    public Map<String, Boolean> deleteAnswer(@Valid @PathVariable(value = "id") Long answerId) throws ResourceNotFoundException {
        Answer answer = answerRepository.findById(answerId).orElseThrow(() -> new ResourceNotFoundException("Answer not found for id: " + answerId));
        answerRepository.delete(answer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("answer deleted", Boolean.TRUE);
        return response;
    }

    @MessageMapping("/status")
    @SendTo("/new/status")
    public String status(String status) {
        return status;
    }

}
