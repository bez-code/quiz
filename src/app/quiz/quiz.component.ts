import { Component } from '@angular/core';
import { QuizService } from './Services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  constructor (public quizService :QuizService){}

}
