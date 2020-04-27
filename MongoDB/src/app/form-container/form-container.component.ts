import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  questions = [
    {
      number: 1,
      title: "Question 1",
      answer: ''
    },
    {
      number: 2,
      title: "Question 2",
      answer: ''
    },
    {
      number: 3,
      title: "Question 3",
      answer: ''
    }
  ]

  page = 1;
  answer1 = '';

  submittedAnswers = '';

  onAnswer(number, answerChosen: string) {
    this.questions[(number - 1)].answer = answerChosen;
    this.submittedAnswers = JSON.stringify(this.questions);
  }

  nextPage() {
    this.page = this.page + 1;
  }
  previousPage() {
    this.page = this.page - 1;
  }

  submit() {
    let body = JSON.stringify({
      //value1: this.answer1
    });
    //this.http.post('http://localhost:3100/radioButtons', body, httpOptions).subscribe();

    //console.log("Submitted answers: {" + this.answer1 + ", " + this.answer2.value + "} to MongoDB");
    //alert("Submitted answers: {" + this.answer1.value + ", " + this.answer2.value + "} to MongoDB");
  }
}
