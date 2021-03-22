package exam.platform.ExamPlatform.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    private boolean enableTime;
    private int time;

    @NotNull
    private String status;
    private boolean randomQuestion;
    private boolean randomAnswers;
    private boolean questionCollection;
    private int numberQuestionCollection;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

//    @ManyToMany(fetch = FetchType.LAZY)
//    private Set<User> users = new HashSet<>();

    public Exam() {}

    public Exam(@NotNull String name, List<Question> questions, boolean enableTime, int time, @NotNull String status, boolean randomQuestion, boolean randomAnswers, boolean questionCollection, int numberQuestionCollection) {
        this.name = name;
        this.questions = questions;
        this.enableTime = enableTime;
        this.time = time;
        this.status = status;
        this.randomQuestion = randomQuestion;
        this.randomAnswers = randomAnswers;
        this.questionCollection = questionCollection;
        this.numberQuestionCollection = numberQuestionCollection;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
        for(Question q : questions) {
            q.setExam(this);
        }
    }

    public boolean getEnableTime() {
        return enableTime;
    }

    public void setEnableTime(boolean enableTime) {
        this.enableTime = enableTime;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isRandomQuestion() {
        return randomQuestion;
    }

    public void setRandomQuestion(boolean randomQuestion) {
        this.randomQuestion = randomQuestion;
    }

    public boolean isRandomAnswers() {
        return randomAnswers;
    }

    public void setRandomAnswers(boolean randomAnswers) {
        this.randomAnswers = randomAnswers;
    }

    public boolean isQuestionCollection() {
        return questionCollection;
    }

    public void setQuestionCollection(boolean questionCollection) {
        this.questionCollection = questionCollection;
    }

    public int getNumberQuestionCollection() {
        return numberQuestionCollection;
    }

    public void setNumberQuestionCollection(int numberQuestionCollection) {
        this.numberQuestionCollection = numberQuestionCollection;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isEnableTime() {
        return enableTime;
    }

//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }
}
