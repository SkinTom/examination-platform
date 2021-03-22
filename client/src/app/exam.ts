import { Question } from './question';

export class Exam {
    id: number;
    name: string;
    enableTime: boolean;
    time: number;
    status: string;
    randomQuestion: boolean;
    randomAnswers: boolean;
    questionCollection: boolean;
    numberQuestionCollection: number;
    questions: Question[];
}
