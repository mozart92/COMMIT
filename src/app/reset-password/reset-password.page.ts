import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  async resetPassword(form) {
    console.log(form);

    const res = await this.authService.resetPassword(form.form.value);
  }

}
