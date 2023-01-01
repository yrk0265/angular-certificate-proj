import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private storageName: string = "Settings";
  private certificateEdit: string = "certificateEdit";
  constructor() { }
  setSettings(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }
  setcertificateEdit(data: any) {
    localStorage.setItem(this.certificateEdit, JSON.stringify(data));
  }
  getUserSettings() {
    let data = localStorage.getItem(this.storageName);
    return data!==null ? JSON.parse(data) : null;
  }
  getCertificateSettings() {
    let data = localStorage.getItem(this.certificateEdit);
    return data!==null ? JSON.parse(data) : null;
  }
  clearCertificateSettings() {
    localStorage.removeItem(this.certificateEdit);
  }
  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }
  cleanAll() {
    localStorage.clear()
  }
}
