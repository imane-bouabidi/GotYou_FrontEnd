import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StoryDto} from '../../models/dtos/StoryDto.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'http://localhost:8080/gotYou/api/stories';

  constructor(private http: HttpClient) {}

  getAllStories(): Observable<StoryDto[]> {
    return this.http.get<StoryDto[]>(this.apiUrl);
  }
}

