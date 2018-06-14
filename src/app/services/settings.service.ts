import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true
  };

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }

}
