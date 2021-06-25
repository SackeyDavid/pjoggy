import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointService } from '../endpoints/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class LiveSearchService {

  private headers: HttpHeaders;
  private getSearchResultsUrl: string; 

  constructor(
    private http: HttpClient,
    private endpoint: EndpointService
  ) 
  { 
    this.headers = this.endpoint.headers();
    this.getSearchResultsUrl = this.endpoint.apiHost + '/search_event/';
  }


  /**
   * Returns a list of events for a search item.
   * @param word The search item.
   * @returns 
   */
   getData(word: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let searchResults: any[] = [];
      const url = this.getSearchResultsUrl + word;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_live_search_ok: ', res);
          searchResults = res;
          resolve(searchResults);
        },
        err => {
          console.log('get_live_search_error: ', err);
          reject(err);
        }
      );
    });
  }

}
