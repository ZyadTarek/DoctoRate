// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {

//   constructor() { }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationCountResult, NotificationResult } from '../_models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsUrl = 'http://localhost:44392/api/notifications';

  constructor(private http: HttpClient) { }

  getNotificationCount(): Observable<NotificationCountResult> {
    const url = `${this.notificationsUrl}/notificationcount`;
    return this.http.get<NotificationCountResult>(url);
  }

  getNotificationMessage(): Observable<Array<NotificationResult>> {
    const url = `${this.notificationsUrl}/notificationresult`;
    return this.http.get<Array<NotificationResult>>(url);

  }

  deleteNotifications(): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.notificationsUrl}/deletenotifications`;
    return this.http.delete(url, { headers: headers });
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  getAllNotification(){
    return this.http.get<Notification[]>("https://localhost:44392/api/Notifications/notificationresult");
  }

  DeleteNotification(id:number): Observable<any> {
      return this.http.delete("https://localhost:44392/api/Notifications/"+id);
    }
}
