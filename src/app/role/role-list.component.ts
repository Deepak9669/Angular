
import { HttpServiceService } from '../http-service.service'; 
import { Component , OnInit } from '@angular/core'; 

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    console.log('role list component init');
    this.search();
  }

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0
  }

  search() {
    let self = this;
    this.httpService.post('http://localhost:8081/Role/search/' + this.form.pageNo, this.form.searchParam, function (response: any) {
      console.log('response ====== ', response)

      if (response.success) {
        self.form.list = response.result.data;
        console.log('role list ====== ', self.form.list)
      }
    })
  }   

}
