import { SettingsService } from './../services/settings.service';
import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class RegisterGuard implements CanActivate {

  constructor(private router: Router,
              private settingsService: SettingsService) {}

  canActivate(): boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
