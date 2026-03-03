import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  endpoint = 'http://localhost:8081/user/save';

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }

  fileToUpload: any = null;

  constructor(private httpService: HttpServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe((pathVariable: any) => {
      this.form.data.id = pathVariable['id'];
    })
  }

  ngOnInit(): void {
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }

  display() {
    var self = this;
    this.httpService.get('http://localhost:8081/user/get/' + this.form.data.id, function (res: any) {
      self.form.data = res.result.data;
      self.form.data.dob = res.result.data.dob.substring(0, 10);
      if (res.result.data.imageId) {
        self.form.data.imageId = res.result.data.imageId;
      }
    })
  }

save() {
  let self = this;

  this.httpService.post(this.endpoint, this.form.data, function (response: any) {

    if (!response.success && response.result.inputerror) {
      self.form.inputerror = response.result.inputerror;
    }

    if (!response.success && response.result.message) {
      self.form.message = response.result.message;
    }

    if (response.success) {
      self.form.message = response.result.message;

      // ✅ FIX HERE
      self.form.data.id = response.result.data;
    }

    if (self.fileToUpload != null && self.form.data.id) {
      self.uploadFile();
    }

  })
}
  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log('file===>', this.fileToUpload);
  }

  uploadFile() {
    let self = this;
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpService.post("http://localhost:8081/user/profilePic/" + this.form.data.id, formData, function (res: any) {
      console.log("imageId = " + res.result.imageId);
      self.form.data.imageId = res.result.imageId;
      self.fileToUpload = null;
    });
  }

}