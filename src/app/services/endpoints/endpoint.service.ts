import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  apiHost: string;
  storageHost: string;
  private localApiHost: string;
  private productionApiHost: string;
  private environment: string;

  constructor() {
    this.environment = environment.production ? 'dev' : 'prod';
    this.productionApiHost = 'http://events369.logitall.biz/api';
    this.localApiHost = 'http://events369.logitall.biz/api';
    this.apiHost = this.environment == 'dev' ? this.localApiHost : this.productionApiHost;
    this.storageHost = this.environment == 'dev' ? this.apiHost + 'storage/' : this.productionApiHost + 'storage/';
  }

  /**
   * Returns the appropriate headers whether uploading a file
   * or doing an normal requrest to the server.
   *
   * @param {boolean} [isUploadRequest]
   * @returns
   * @memberof EndpointService
   */
   headers(isUploadRequest?: boolean) {
    const token = sessionStorage.getItem('x_auth_token');
    if (_.isUndefined(isUploadRequest) || !isUploadRequest) {
      const httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return httpHeaders;
    }
    else {
      const httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return httpHeaders;
    }
  }

  /**
   * Returns the appropriate headers if the user hasnt obtained
   * a token yet, usually for api's that doesnt require the user
   * to be logged in to work.
   *
   * @returns
   * @memberof EndpointService
   */
  _headers() {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  /**
   * Set cheader with a specified token.
   * @param token Token to set.
   */
  setHeaders(token: string) {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
  }

  /**
   * Set header for multipart/form content-type.
   * @param token Token to set.
   */
   formHeaders() {
    const token = sessionStorage.getItem('x_auth_token');
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data;',
      'Authorization': 'Bearer ' + token
    });
  }

}
