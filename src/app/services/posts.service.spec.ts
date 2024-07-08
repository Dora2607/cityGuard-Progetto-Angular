import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getPosts']);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: spy }],
    });
    service = TestBed.inject(PostsService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set all posts', () => {
    const posts = [
      {
        id: 139915,
        user_id: 7015124,
        title: 'Defaeco in carbo decet audeo volutabrum corroboro.',
        body: 'Ultio cattus patrocinor. Sint cubitum vapulus. Valetudo tertius excepturi. Convoco delego sollers. Supellex antepono admoveo. Culpa appello deleniti. Aro dolores certo. Avaritia testimonium degero. Vir culpa temeritas. Vel modi theca. Voluptas vado error. Abduco sulum desipio. Suffoco quibusdam spiritus. Ea convoco velit.',
      },
      {
        id: 139914,
        user_id: 7015123,
        title: 'Summa aliquid accedo qui admoneo cognomen victus.',
        body: 'Omnis et repellendus. Comminor utpote bonus. Acquiro veritas odio. Ut apud cursus. Depraedor amet cilicium. Vel doloribus pecto. Fuga cedo creta. Virgo qui aegre. Agnosco usque sint. Complectus advenio beneficium. Textus creo sint. Suppono curiositas delectus. Vero nobis altus. Charisma callide occaecati. Cur aliquam derideo. Teres despecto conqueror.',
      },
    ];
    service.setAllPosts(posts);
    service.allPostsChanged.subscribe((allPosts) => {
      expect(allPosts).toEqual(posts);
    });
  });

  it('should set displayed posts', () => {
    const posts = [
      {
        id: 139915,
        user_id: 7015124,
        title: 'Defaeco in carbo decet audeo volutabrum corroboro.',
        body: 'Ultio cattus patrocinor. Sint cubitum vapulus. Valetudo tertius excepturi. Convoco delego sollers. Supellex antepono admoveo. Culpa appello deleniti. Aro dolores certo. Avaritia testimonium degero. Vir culpa temeritas. Vel modi theca. Voluptas vado error. Abduco sulum desipio. Suffoco quibusdam spiritus. Ea convoco velit.',
      },
      {
        id: 139914,
        user_id: 7015123,
        title: 'Summa aliquid accedo qui admoneo cognomen victus.',
        body: 'Omnis et repellendus. Comminor utpote bonus. Acquiro veritas odio. Ut apud cursus. Depraedor amet cilicium. Vel doloribus pecto. Fuga cedo creta. Virgo qui aegre. Agnosco usque sint. Complectus advenio beneficium. Textus creo sint. Suppono curiositas delectus. Vero nobis altus. Charisma callide occaecati. Cur aliquam derideo. Teres despecto conqueror.',
      },
    ];
    service.setDisplayedPosts(posts);
    service.displayedPostsChanged.subscribe((displayedPosts) => {
      expect(displayedPosts).toEqual(posts);
    });
  });

  it('should get all posts', () => {
    const userIds = [7015124, 7015123];

    const post1 = [
      {
        id: 139915,
        user_id: 7015124,
        title: 'Defaeco in carbo decet audeo volutabrum corroboro.',
        body: 'Ultio cattus patrocinor. Sint cubitum vapulus. ',
      },
    ];
    const post2 = [
      {
        id: 139914,
        user_id: 7015123,
        title: 'Summa aliquid accedo qui admoneo cognomen victus.',
        body: 'Omnis et repellendus. Comminor utpote bonus. ',
      },
    ];
    (apiService.getPosts as jasmine.Spy).and.callFake((userId) => {
      if (userId === 7015124) {
        return of(post1);
      } else if (userId === 7015123) {
        return of(post2);
      } else {
        return of([]);
      }
    });
    service.getAllPosts(userIds).subscribe((allPosts) => {
      expect(allPosts).toEqual([...post1, ...post2]);
    });
  });

  it('should add a personal post', () => {
    const personalPost = {
      id: 139909,
      user_id: 7015118,
      title: 'Cubicularis denego acies ad expedita assumenda concedo eveniet.',
      body: 'Aspicio civis vigor. Calco patior curis.',
    };

    service.addPersonalPost(personalPost);
    service.displayedPostsChanged.subscribe((displayedPosts) => {
      expect(displayedPosts).toEqual([personalPost]);
    });
    service.personalPostChanged.subscribe((post) => {
      expect(post).toEqual([personalPost]);
    });
  });

  it('should remove post by user id', () => {
    const posts = [
      {
        id: 139915,
        user_id: 7015124,
        title: 'Defaeco in carbo decet audeo volutabrum corroboro.',
        body: 'Ultio cattus patrocinor. Sint cubitum vapulus. Valetudo tertius excepturi. Convoco delego sollers. Supellex antepono admoveo. Culpa appello deleniti. Aro dolores certo. Avaritia testimonium degero. Vir culpa temeritas. Vel modi theca. Voluptas vado error. Abduco sulum desipio. Suffoco quibusdam spiritus. Ea convoco velit.',
      },
      {
        id: 139914,
        user_id: 7015123,
        title: 'Summa aliquid accedo qui admoneo cognomen victus.',
        body: 'Omnis et repellendus. Comminor utpote bonus. Acquiro veritas odio. Ut apud cursus. Depraedor amet cilicium. Vel doloribus pecto. Fuga cedo creta. Virgo qui aegre. Agnosco usque sint. Complectus advenio beneficium. Textus creo sint. Suppono curiositas delectus. Vero nobis altus. Charisma callide occaecati. Cur aliquam derideo. Teres despecto conqueror.',
      },
    ];

    service.setAllPosts(posts);
    service.removePosts(7015124);
    service.allPostsChanged.subscribe((allPosts) => {
      expect(allPosts).not.toContain(posts[0]);
    });

    service.displayedPostsChanged.subscribe((displayedPosts) => {
      expect(displayedPosts).not.toContain(posts[0]);
    });
  });
});
