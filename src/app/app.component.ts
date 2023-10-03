import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Safar.com!!!';
  data: string = 'red';
  isDestroy: boolean = true;

  getDataFromChild(value) 
  {
    console.log(value);   
   }

   courses: string[] = 
   [
    'FullStack Developer', 'Software Testing', 
   'Database Engineer', 'CISCO Technologies',
   'Cloud Computing','Animation & Graphics' 
  ];

  OnTextValuCHanges(val){
    this.data = val.value;
    alert(val.value);
  }
  OnDestroy(){

    this.isDestroy = false;

  }
}