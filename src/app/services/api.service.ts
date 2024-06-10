import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { newUser } from '../models/users.model';
import { TOKEN } from '../token';

const USERS_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=30';
const USERS_URL_SHORT = 'https://gorest.co.in/public/v2/users';
const POSTS_URL_SHORT = 'https://gorest.co.in/public/v2/posts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}

  registerUser(user: newUser) {
    const token = TOKEN;
    return this.httpClient.post(`${USERS_URL_SHORT}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
