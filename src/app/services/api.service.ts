import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users, newUser } from '../models/users.model';
import { TOKEN } from '../token';
import { Observable } from 'rxjs';

const USERS_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=30';
const USERS_URL_SHORT = 'https://gorest.co.in/public/v2/users';
const POSTS_URL_SHORT = 'https://gorest.co.in/public/v2/posts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  registerUser(user: newUser) {
    const token = TOKEN;
    return this.httpClient.post(`${USERS_URL_SHORT}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUsers(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(USERS_URL);
  }

  deleteUser(userId: number) {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`${USERS_URL_SHORT}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addUser(user: newUser) {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${USERS_URL_SHORT}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }



}
