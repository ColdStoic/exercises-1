import { Component, OnInit } from '@angular/core';
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

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  answer1 = new FormControl('');
  answer2 = new FormControl('');

  submit() {
    let body = JSON.stringify({
      value1: this.answer1.value,
      value2: this.answer2.value
    });
    this.http.post('http://localhost:3100/radioButtons', body, httpOptions).subscribe();

    console.log("Submitted answers: {" + this.answer1.value + ", " + this.answer2.value + "} to MongoDB");
    alert("Submitted answers: {" + this.answer1.value + ", " + this.answer2.value + "} to MongoDB");
  }
}
