import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  socialLinks = {
    instagram: 'https://instagram.com/foodie.leonne',
    tiktok: 'https://tiktok.com/@foodie.leonne',
    facebook: 'https://facebook.com/foodieleonne'
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  navigateToAdmin() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/admin/login']);
    }
  }
}
