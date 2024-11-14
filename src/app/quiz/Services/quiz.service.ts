import { computed, inject, Injectable, signal } from '@angular/core';
import { QuestionInterface } from '../types/question.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendQuestionInterface } from '../types/BackendQuestion.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  http = inject(HttpClient)
  questions = signal<QuestionInterface[]>([]);

  currentQuestionIndex = signal<number>(0)

  currentAnswer = signal<string | null>(null)

  correctAnswerCount = signal<number>(0)

  error = signal<string | null>(null)

  currentQuestion = computed(() =>
    this.questions()[this.currentQuestionIndex()]
  );

  showResults = computed(() =>
    this.currentQuestionIndex() === this.questions().length - 1
  );

  goToNextQuestion(): void {
    const currentQuestionIndex = this.showResults() ?
      this.currentQuestionIndex() :
      this.currentQuestionIndex() + 1;
    this.currentQuestionIndex.set(currentQuestionIndex);
    this.currentAnswer.set(null)
  };

  selectAnswer(answerText: string): void {
    this.currentAnswer.set(answerText);
    const correctAnswerCount = answerText === this.currentQuestion().correctAnswer ?
      this.correctAnswerCount() + 1 :
      this.correctAnswerCount();
    this.correctAnswerCount.set(correctAnswerCount)
  }

  currentQuesstionAnswer = computed(() =>
    this.shuffleAnswer(this.currentQuestion())

  );

  shuffleAnswer(question: QuestionInterface): string[] {
    const unshuffledAnswer = [this.currentQuestion().correctAnswer,
    ... this.currentQuestion().incorrectAnswer]
    return unshuffledAnswer.map((a) => ({
      sort: Math.random(), value: a
    }))
      .sort((a, b) => a.sort - b.sort).map((a) => a.value)
  }

  restart(): void {
    this.currentQuestionIndex.set(0)
  }

  getQuestion(): Observable<QuestionInterface[]> {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    return this.http.get<{ results: BackendQuestionInterface[] }>(apiUrl)
      .pipe(map(response => this.normaliseQeustion(response.results)))
  }

  normaliseQeustion(backendQuestion: BackendQuestionInterface[]): QuestionInterface[] {
    return backendQuestion.map(backendQuestion => {
      const incorrectAnswer = backendQuestion.incorrect_answers.map(incorrectAnswer =>
        decodeURIComponent(incorrectAnswer))
      return {
        question: decodeURIComponent(backendQuestion.question),
        correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
        incorrectAnswer
      }

    })
  }

  getMockQuestion(): QuestionInterface[] {
    return [
      {
        question: 'What does CSS stand for?',
        incorrectAnswer: [
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets',
        ],
        correctAnswer: 'Cascading Style Sheets',
      },

      {
        question:
          'Where in an HTML document is the correct place to refer to an external style sheet?',
        incorrectAnswer: [
          'In the <body> section',
          'At the end of the document',
          "You can't refer to an external style sheet",
        ],
        correctAnswer: 'In the <head> section',
      },
      {
        question: 'Which HTML tag is used to define an internal style sheet?',
        incorrectAnswer: ['<script>', '<headStyle>', '<css>'],
        correctAnswer: '<style>',
      },
      {
        question: 'Which HTML attribute is used to define inline styles?',
        incorrectAnswer: ['class', 'font', 'styles'],
        correctAnswer: 'style',
      },
      {
        question: 'Which is the correct CSS syntax?',
        incorrectAnswer: [
          '{body:color=black;}',
          '{body;color:black;}',
          'body:color=black;',
        ],
        correctAnswer: 'body {color: black;}',
      },
      {
        question: 'How do you insert a comment in a CSS file?',
        incorrectAnswer: [
          "' this is a comment",
          '// this is a comment',
          '// this is a comment //',
        ],
        correctAnswer: '/* this is a comment */',
      },
      {
        question: 'Which property is used to change the background color?',
        incorrectAnswer: ['color', 'bgcolor', 'bgColor'],
        correctAnswer: 'background-color',
      },
      {
        question: 'How do you add a background color for all <h1> elements?',
        incorrectAnswer: [
          'all.h1 {background-color:#FFFFFF;}',
          'h1.setAll {background-color:#FFFFFF;}',
          'h1.all {background-color:#FFFFFF;}',
        ],
        correctAnswer: 'h1 {background-color:#FFFFFF;}',
      },
    ]
  }
}


