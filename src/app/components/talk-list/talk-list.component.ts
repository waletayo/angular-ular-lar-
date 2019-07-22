import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app-service";

@Component({
  selector: 'app-talk-list',
  templateUrl: './talk-list.component.html',
  styleUrls: ['./talk-list.component.css']
})
export class TalkListComponent implements OnInit {

  loading = false;
  errorMessage;
  successMessage;
  talks: any = [];


  constructor(private appservice: AppService) {
  }

  ngOnInit() {
    this.getTalk();
  }

  getTalk() {
    this.loading = true;
    this.appservice.get('/talks').subscribe(res => {
        console.log('response', res);
        this.loading = false;
        if (res.success) {
          this.talks = res.data;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  onDelete(id) {
    if (id) {
      if (confirm('Are you sure you want to delete this?')) {
        console.log('id:', id);
        this.appservice.delete('/talks' + '/' + id).subscribe(res => {
          if (res.success === true) {
            window.location.reload();
          }

          console.log('res:', res);
        }, err => {
          console.log('err:', err);
        });
      }
    }
  }

}
