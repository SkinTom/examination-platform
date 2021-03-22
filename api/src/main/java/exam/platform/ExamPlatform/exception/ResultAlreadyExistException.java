package exam.platform.ExamPlatform.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ResultAlreadyExistException extends Exception {

        private static final long serialVersionUID = 2L;
        public ResultAlreadyExistException(String message) {
            super(message);
        }
}
