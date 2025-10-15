import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-admin-success-message',
  templateUrl: './admin-success-message.component.html',
  styleUrl: './admin-success-message.component.scss'
})
export class AdminSuccessMessageComponent implements OnInit {
  message: string = '';
  type: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.currentMessage.subscribe(
      message => (this.message = message),
    );
    this.notificationService.currenttype.subscribe(
      type => this.type = type
    );
  }

}
