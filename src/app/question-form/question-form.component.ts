import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Question } from '../questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit {
  @Input() question!: Question;
  @Output() onChoiceMade = new EventEmitter<string>();

  selected!: String;

  ngOnInit() {}

  radioSelected(event: MatRadioChange) {
    this.onChoiceMade.emit(event.value);
  }
}
