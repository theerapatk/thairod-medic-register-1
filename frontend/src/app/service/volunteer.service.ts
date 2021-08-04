import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicInfo } from '../model/basic-info';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<any> {
    const url = `${environment.apiPrefix}/volunteers/${id}`;
    return this.http.get<any>(url);
  }

  create(user: any): Observable<any> {
    user.dateOfBirth = moment(user.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const url = `${environment.apiPrefix}/volunteers`;
    return this.http.post<any>(url, user);
  }

  getVolunteers(): Observable<BasicInfo[]> {
    return this.http.get<BasicInfo[]>(`${environment.apiPrefix}/volunteers`);
  }

}
