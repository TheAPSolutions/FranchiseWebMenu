import { Component, input } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.scss'
})
export class SuccessMessageComponent {
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
