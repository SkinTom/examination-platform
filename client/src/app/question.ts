import { Answer } from './answer';
import { Exam } from './exam';

export class Question {
    id: number;
    question: string;
    answers: Answer[];
    points: number;
    // mulitpleChoice: boolean;
    // required: boolean;
    exam: Exam;
}
