import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

  constructor(private httpService: HttpServiceService){}
   
    form: any = {
      data: {},
      message: '',
      inputerror: {}
    }
  
     save() {
    let self = this;
    console.log('form data== ', this.form.data);
    this.httpService.post('http://localhost:8081/college/save', this.form.data, function (response: any) {
      console.log('response ====== ', response)

      if (!response.success && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
      }
    })
  }

}