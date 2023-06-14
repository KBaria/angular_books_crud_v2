import { Injectable } from '@angular/core';
import { PublishersBackendService } from '../backend/publishers-backend.service';
import { Publisher } from '../../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublishersFrontendService {

  constructor(private service : PublishersBackendService) { }

  getAllPublishers() {
    return this.service.getAllPublishers();
  }

  getPublisherById(id : number) {
    return this.service.getPublisherById(id);
  }

  getPublishersByName(name : string) {
    return this.service.getPublishersByName(name);
  }

  getPublishersByNameLike(pattern : string) {
    return this.service.getPublishersByNameLike(pattern);
  }

  defaultPublisher() {
    return {
      id: 0,
      publisherName: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    } as Publisher;
  }

}
