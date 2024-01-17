import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRegisterRequest } from '../models/IUserRegisterRequest';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { ILoggedInUser } from '../models/ILoggedInUser';
import { Router } from '@angular/router';
import { IUserDetails } from '../models/IUserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.userUrl

  private currentUserSource = new ReplaySubject<ILoggedInUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient, private router: Router) { }

  getCurrentUser(): Observable<void>{
    return this.httpClient.get<ILoggedInUser>(this.url + '/api/auth')
    .pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        this.currentUserSource.next(response);
      })
    )
  }

  signup(data: IUserRegisterRequest){
    return this.httpClient.post(this.url + 
      "/api/auth/register",data)
  }

  login(data: any){
    return this.httpClient.post<ILoggedInUser>(this.url + 
      "/api/auth/login",data)
      .pipe(
        map((response: ILoggedInUser) => {
          this.currentUserSource.next(response);
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl("/userdashboard");
        })
      )
  }

  getAllUsers(){
    return this.httpClient.get<IUserDetails[]>(this.url+"/api/auth/getAll");
  }

  update(data:any){
    return this.httpClient.put(this.url+ `/api/auth/update/${data.id}`,data)
  }

  delete(id:number){
    return this.httpClient.delete(this.url + `/api/auth/delete/${id}`)
  }
}
