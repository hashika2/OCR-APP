import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  userIsAuthonticated = false;
  private authListnersSubs: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authListnersSubs = this.authService.getAuthStatusListner()
      .subscribe(isAuthonticated => {
        this.userIsAuthonticated = isAuthonticated;
      });
  }

  ngOnDestroy(){
    this.authListnersSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
