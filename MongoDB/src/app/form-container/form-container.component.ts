import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})

export class FormContainerComponent implements OnInit {
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  questions = [
    {
      number: 1,
      title: "Where do babies come from?",
      answer: ""
    },
    {
      number: 2,
      title: "Why is the speed of light that fast?",
      answer: ""
    },
    {
      number: 3,
      title: "Where do your thoughts come from?",
      answer: ""
    }
  ]

  page = 1;
  firstname = '';
  lastname = '';
  email = '';
  contact = {};
  submittedAnswers = '';

  updateForm(text: string) {
    this.contact = {firstname: this.firstname, lastname: this.lastname, email: this.email};
    this.submittedAnswers = JSON.stringify([this.contact, this.questions], undefined, 4);
  }

  onAnswer(number, answerChosen: string) {
    this.questions[(number - 1)].answer = answerChosen;
    this.submittedAnswers = JSON.stringify([this.contact, this.questions], undefined, 4);
  }

  nextPage() {
    this.page = this.page + 1;
  }
  previousPage() {
    this.page = this.page - 1;
  }

  submit() {
    this.http.post('http://localhost:3100/radioButtons', this.submittedAnswers, httpOptions).subscribe();
    console.log("Submitted answers: {" + this.submittedAnswers + "} to MongoDB");
  }
}
