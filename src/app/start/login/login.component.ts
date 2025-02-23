import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ILogin, ILoginResponse } from 'src/app/interfaces/login.interface';
import { AppService } from 'src/app/services/app.service';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  infoLogin: ILogin = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private appService: AppService, private messageService: MessageService,
    private authGuard:AuthGuard) {}

  ngOnInit() {
	if (this.authGuard.isLoggedIn()){
      this.router.navigateByUrl('store/categories');
    }
  }

   login() {
    this.appService.login(this.infoLogin).subscribe({
      next: (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigate([`/store`], { replaceUrl: true });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong credentials' });
      }
    });
  }
}
