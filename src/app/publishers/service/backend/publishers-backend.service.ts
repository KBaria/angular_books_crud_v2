import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from '../../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublishersBackendService {

  private baseUrl = "http://localhost:3000/publishers"

  constructor(private http : HttpClient) { }

  getAllPublishers() {
    return this.http.get<Publisher[]>(this.baseUrl);
  }

  getPublisherById(id : number) {
    return this.http.get<Publisher>(`${this.baseUrl}/${id}`);
  }

  getPublishersByName(name : string) {
    return this.http.get<Publisher[]>(`${this.baseUrl}?publisherName=${name}`);
  }

  getPublishersByNameLike(pattern : string) {
    return this.http.get<Publisher[]>(`${this.baseUrl}?publisherName_like=${pattern}`);
  }

}
