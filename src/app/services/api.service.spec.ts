import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Users, newUser } from '../models/users.model';
import { provideHttpClient } from '@angular/common/http';
import { Todos } from '../models/todos.model';
import { Posts, newPosts } from '../models/posts.model';
import { Comments, newComments } from '../models/comments.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const USERS_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=30';
  const USERS_URL_SHORT = 'https://gorest.co.in/public/v2/users';
  const POSTS_URL_SHORT = 'https://gorest.co.in/public/v2/posts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    const dummyUser: newUser = {
      name: 'Test User',
      email: 'test@example.com',
      gender: 'Male',
      status: 'Active',
    };

    service.registerUser(dummyUser).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should retrieve a list of users', () => {
    const dummyUsers: Users[] = [
      {
        id: 1,
        name: 'User 1',
        email: 'user@one.test',
        gender: 'male',
        status: 'active',
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user@two.test',
        gender: 'female',
        status: 'inactive',
      },
    ];

    service.getUsers().subscribe((user) => {
      expect(user.length).toBe(dummyUsers.length);
      expect(user).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${USERS_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should delete a user', () => {
    const userId = 1;
    service.deleteUser(userId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should added a new user', () => {
    const dummyUser: newUser = {
      name: 'Test User',
      email: 'test@example.com',
      gender: 'Male',
      status: 'Active',
    };

    service.addUser(dummyUser).subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('should retrieve a list of Todos', () => {
    const userId = 1;
    const dummyTodos: Todos[] = [
      {
        id: 55265,
        user_id: 6983651,
        title:
          'Charisma territo tamen bibo tremo synagoga trado non inventore.',
        due_on: new Date('2024-07-16T00:00:00.000+05:30'),
        status: 'pending',
      },
      {
        id: 55243,
        user_id: 6983520,
        title: 'Error tenuis iure cohibeo rem vulpes thymbra dapifer.',
        due_on: new Date('2024-07-10T00:00:00.000+05:30'),
        status: 'completed',
      },
    ];

    service.getTodos(userId).subscribe((todos) => {
      expect(todos.length).toBe(dummyTodos.length);
      expect(todos).toEqual(dummyTodos);
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}/${userId}/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });

  it('should retrieve a list of posts', () => {
    const userId = 1;

    const dummyPosts: Posts[] = [
      {
        id: 137665,
        user_id: 6983651,
        title: 'Caste cotidie at ancilla qui.',
        body: 'Peior officia caelum. Agnosco placeat thymum. Bardus arca certe. Bestia tendo balbus. Patria iure vestrum. Dedecor vallum ustulo. Amor claro ratione. Verbera cohibeo deleo. Et itaque triginta. Terminatio cui ut. Quos usus voluptas. Constans adiuvo suppono. Somnus totam vinitor.',
      },
      {
        id: 137664,
        user_id: 6983651,
        title: 'Pectus turba cum soleo turpe dicta.',
        body: 'Fugiat coniuratio cruciamentum. Asper viridis nihil. Attollo pariatur tondeo. Patria accendo conservo. Cohors apparatus rerum. Aestus amiculum villa. Demo substantia placeat. Non defigo textus. Complectus provident unus. Vallum approbo vel.',
      },
    ];

    service.getPosts(userId).subscribe((posts) => {
      expect(posts.length).toBe(dummyPosts.length);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}/${userId}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should retrieve a list of comments', () => {
    const postId = 137662;

    const dummyComments: Comments[] = [
      {
        id: 108218,
        post_id: 137662,
        name: 'Aasha Mehra',
        email: 'aasha_mehra@senger.test',
        body: 'Ad doloremque omnis. Exercitationem laboriosam quis.',
      },
      {
        id: 108217,
        post_id: 137662,
        name: 'Aasha Mehra',
        email: 'aasha_mehra@senger.test',
        body: 'Omnis qui sunt. Voluptatem sunt in. Et ea voluptas. Nostrum omnis deserunt.',
      },
    ];

    service.getComments(postId).subscribe((comments) => {
      expect(comments.length).toBe(dummyComments.length);
      expect(comments).toEqual(dummyComments);
    });

    const req = httpMock.expectOne(`${POSTS_URL_SHORT}/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should added a new comment', () => {
    const postId = 137662;
    const dummyNewComment: newComments = {
      name: 'Aasha Mehra',
      email: 'aasha_mehra@senger.test',
      body: 'Omnis qui sunt. Voluptatem sunt in. Et ea voluptas. Nostrum omnis deserunt.',
    };
    const dummyComment: Comments[] = [
      {
        id: 108217,
        post_id: 137662,
        name: 'Aasha Mehra',
        email: 'aasha_mehra@senger.test',
        body: 'Omnis qui sunt. Voluptatem sunt in. Et ea voluptas. Nostrum omnis deserunt.',
      },
    ];

    service.addComments(postId, dummyNewComment).subscribe((comment) => {
      expect(comment).toEqual(dummyComment);
    });

    const req = httpMock.expectOne(`${POSTS_URL_SHORT}/${postId}/comments`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyComment);
  });

  it('should added a new post', () => {
    const userId = 137662;
    const dummyNewPost: newPosts = {
      title: 'Voluptatem sunt in',
      body: 'Omnis qui sunt. Voluptatem sunt in. Et ea voluptas. Nostrum omnis deserunt.',
    };
    const dummyPost: Posts[] = [
      {
        id: 137664,
        user_id: 6983651,
        title: 'Voluptatem sunt in.',
        body: 'Omnis qui sunt. Voluptatem sunt in. Et ea voluptas. Nostrum omnis deserunt.',
      },
    ];

    service.addPosts(userId, dummyNewPost).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${USERS_URL_SHORT}/${userId}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyPost);
  });
});
