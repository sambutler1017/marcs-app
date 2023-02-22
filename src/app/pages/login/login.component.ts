import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'projects/insite-kit/src/service/stomp/subscription.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.subscriptionService.disconnect();
  }
}
