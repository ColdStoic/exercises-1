import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.css']
})

export class RadioButtonsComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() answer: string;
  @Output() answerChosen: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  //answer: string = this.defaultChoice;

  public choose(answer: string) {
      this.answerChosen.emit(answer);
  }
}
