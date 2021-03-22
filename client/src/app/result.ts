import { Exam } from "./exam";
import { User } from "./user";

export class Result {
    id: number;
    user: User;
    exam: Exam;
    completed: boolean;
    points: number;
    maxPoints: number;
    percent: number;
    correctAnswers: number;
    incorrectAnswers: number;
}
