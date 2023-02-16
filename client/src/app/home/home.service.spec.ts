import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { Image } from './image.interface';
import { CLOUDINARY_TOKEN } from '../tokens';
import { HomeService } from './home.service';


const createSpy = jasmine.createSpy;
const createSpyObj = jasmine.createSpyObj;

const mockImages: Image[] = [
  {
    public_id: '1',
    url: 'test1',
    context: {
      starred: 'false',
    },
  },
  {
    public_id: '2',
    url: 'test2',
    context: {
      starred: 'true',
    },
  },
];

const uploadMockImage: Image = {
  public_id: '6',
  url: 'test6',
  context: {
    starred: 'false',
  },
};

describe('HomeService', () => {
  let service: HomeService;
  let cloudinaryMock = createSpyObj('Cloudinary', ['image']);

  const httpClientMock = {
    get: createSpy('get').and.returnValue(
      of({ resources: mockImages, next_cursor: '3' })
    ),
    post: createSpy('post').and.returnValue(of(uploadMockImage)),
    patch: createSpy('patch'),
    delete: createSpy('delete'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
        { provide: CLOUDINARY_TOKEN, useValue: cloudinaryMock },
      ],
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a request to get images', () => {
    service
      .getImages()
      .subscribe((result) => expect(result.resources.length).toBe(2));
  });

  it('should upload an image', () => {
    const fileMock: any = { name: 'mockFile' };
    service.uploadImage(fileMock as File).subscribe((result) => {
      expect((result as Image).public_id).toEqual('6');
      expect((result as Image).url).toEqual('test6');
    });
  });
});
