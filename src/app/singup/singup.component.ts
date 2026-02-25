import { Component } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

 
  form:any = {
    data:{}
  };

  singUp(){
    
  console.log('firstName ==' , this.form.data.firstName);
  console.log('lastName ==' , this.form.data.lastName);
  console.log(' email ==' , this.form.data.loginId);
  console.log('password ==' , this.form.data.password);
  console.log('dob ==' , this.form.data.dob);
  
  }

}
