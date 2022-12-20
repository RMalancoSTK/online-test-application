import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Answers,
  Choice,
  Choice as Event,
  Question,
  QuestionsService,
  Quiz,
  Results,
} from '../questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  quiz!: Quiz;
  answers!: Answers;
  results!: Results;
  questions!: Question[];
  currentQuestionIndex!: number;
  currentQuiz!: String;
  correctCount!: number;
  incorrectCount!: number;
  showResults = false;
  constructor(
    private route: ActivatedRoute,
    public questionsService: QuestionsService
  ) {}
  ngOnInit() {
    this.questionsService
      .getQuestions(this.route.snapshot.params['quizId'])
      .subscribe((questions) => {
        this.questions = questions;
        this.currentQuiz =
          this.route.snapshot.params['quizId'].charAt(0).toUpperCase() +
          this.route.snapshot.params['quizId'].slice(1);
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
        this.results = new Results(0, 0, '');
        this.correctCount = 0;
        this.incorrectCount = 0;
      });
  }

  updateChoice(event: string | Choice) {
    if (typeof event === 'string') {
      this.answers.values[this.currentQuestionIndex] = new Choice(event, false);
    } else {
      this.answers.values[this.currentQuestionIndex] = event;
    }
    console.log(this.answers);
  }

  updateStats() {
    if (this.answers.values[this.currentQuestionIndex].correct) {
      ++this.correctCount;
    } else {
      ++this.incorrectCount;
    }
    var totalQuestions = this.correctCount + this.incorrectCount;
    var percentage = ((this.correctCount / totalQuestions) * 100).toFixed(2);
    this.results.correctCount = this.correctCount;
    this.results.totalQuestions = totalQuestions;
    this.results.percentage = percentage;
  }

  nextOrViewResults() {
    this.updateStats();
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  reset() {
    this.currentQuestionIndex = 0;
    this.answers = new Answers();
    this.results = new Results(0, 0, '');
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.showResults = false;
  }
}
