import { Component, OnInit } from '@angular/core';
import { QuizService } from './Services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(public quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuestion().subscribe({
      next: question => {

        this.quizService.questions.set(question)
      },
      error: (err) => {
        this.quizService.error.set(err.massage)
      }
    })


}



}

