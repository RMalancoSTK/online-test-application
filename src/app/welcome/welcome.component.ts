import { Component } from '@angular/core';
import { QuestionsService, Quiz } from '../questions.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  quiz: Quiz[] = [];
  constructor(private questionsService: QuestionsService) {
    this.questionsService.getQuizzes().subscribe((quizzes) => {
      this.quiz = quizzes;
    });
  }
}
