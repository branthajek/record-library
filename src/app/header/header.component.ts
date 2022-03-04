import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecordsService } from '../library/records.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('formRef', {static: true}) searchForm!: NgForm;
  isAuthenticated = false;
  navbarCollapsed = true;
  private userSubscription!: Subscription;

  constructor(public recordsService: RecordsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user.token;
      }
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleNavbarCollapse() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  onSubmit() {
    let searchBy = this.searchForm.value.search;
    this.recordsService.searchBy.next(searchBy);
  }

  onLogout() {
    this.authService.logOut();
  }
}
