import { Component } from '@angular/core';
import { QuizService } from '../../Services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  constructor (public quizService :QuizService){}

}
