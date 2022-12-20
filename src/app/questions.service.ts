import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  public getQuizzes() {
    return this.http
      .get<Quiz[]>('./assets/quiz-list.json')
      .pipe(map((quizzes) => quizzes));
  }

  public getQuestions(fileName: string) {
    return this.http
      .get<Question[]>(`./assets/${fileName}.json`)
      .pipe(map((questions) => questions));
  }
}

export class Choice {
  constructor(public value: string, public correct?: boolean) {}
}

export class Question {
  constructor(public label: string, public choices: Choice[]) {}
}

export class Quiz {
  constructor(
    public label: string,
    public name: string,
    public description: string,
    public fileName: string
  ) {}
}

export class Answers {
  constructor(public values: Choice[] = []) {}
}

export class Results {
  constructor(
    public correctCount: number,
    public totalQuestions: number,
    public percentage: string
  ) {}
}
