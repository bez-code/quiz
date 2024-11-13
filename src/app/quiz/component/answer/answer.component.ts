import { Component, computed, inject, input } from '@angular/core';
import { QuizService } from '../../Services/quiz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent {

  answerText = input.required<string>();

  answerIndex = input.required<number>();

  quizService = inject(QuizService)

  letterMappind = ['A', 'B', 'C', 'D']

  isCorrectAnswer = computed(() =>
    !!this.quizService.currentAnswer() &&
    this.answerText() === this.quizService.currentQuestion().correctAnswer
  );

  isWrongAnswer = computed(() =>
    this.answerText() === this.quizService.currentAnswer() &&
    this.quizService.currentAnswer() !== this.quizService.currentQuestion().correctAnswer)
}
