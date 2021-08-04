import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicInfo } from '../model/basic-info';
import { DoctorJobInfo } from '../model/doctor-job-info';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  findOne(nationalId: number): Observable<any> {
    const url = `${environment.apiPrefix}/doctors/${nationalId}`;
    return this.http.get<any>(url);
  }

  create(user: BasicInfo & DoctorJobInfo): Observable<any> {
    user.dateOfBirth = moment(user.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const formData: any = new FormData();
    formData.append('body', JSON.stringify(user));
    // formData.append('id_card', 'test'); TODO: add file here
    const url = `${environment.apiPrefix}/doctors`;
    return this.http.post<any>(url, formData);
  }

}
