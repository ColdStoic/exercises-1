import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.css']
})
export class RadioButtonsComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Output() answerChosen: EventEmitter<any> = new EventEmitter();

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  answer: string = '';

  public choose(answer: string) {
      this.answerChosen.emit(answer);
  }
}
