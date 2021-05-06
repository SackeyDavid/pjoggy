import { Injectable } from '@angular/core';
import { EndpointService } from './../endpoints/endpoint.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersFavoritesService {
  
  private headers: HttpHeaders;
  addToFavoritesUrl: string;
  removeFromFavoritesUrl: string;
  getUserFavoritesUrl: string;
  

  constructor(
    private http: HttpClient, 
    private endpoint: EndpointService
    ) 
    {

    this.headers = this.endpoint.headers();
    this.addToFavoritesUrl = this.endpoint.apiHost + '/v1/add_to_favourites';
    this.removeFromFavoritesUrl = this.endpoint.apiHost + '/v1/delete_favourite/';
    this.getUserFavoritesUrl = this.endpoint.apiHost + '/v1/get_favourites/'; 
    
  }

  getUserFavorites(userID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let user_favorites: any[] = [];
      const url = this.getUserFavoritesUrl + userID;
      this.http.get<any>(url, { headers: this.headers}).subscribe(
        res => {
          console.log('get_user_favorites_ok: ', res);
          user_favorites = res;
          resolve(user_favorites);
        },
        err => {
          console.log('get_user_favorites_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Add a new favorite event for a user.
   * @param favorite Favorite
   * @returns 
   */
  addFavoriteEvent(event_id: any, user_id: any): Promise<any> {
    console.log(this.addToFavoritesUrl);
    return new Promise((resolve, reject) => {
      const body = {
        'event_id': event_id,
        'user_id': user_id,
      };

      console.log(body);

      this.http.post<any>(this.addToFavoritesUrl, JSON.stringify(body), { headers: this.headers}).subscribe(
        res => {
          console.log('added_favorite_ok: ', res);
          if (res.message == 'Ok') {
            resolve(true);
          }
          else {
            resolve(false);
          }
        },
        err => {
          console.error('add_favorite_error: ', err);
          reject(err);
        }
      );
    });
  }

  /**
   * Remove an existing event from user's favorites.
   * @param favorite Favorite
   * @returns 
   */
  removeEventFromFavorite(favorite_id: any): Promise<boolean> {

    

    return new Promise((resolve, reject) => {
      const url = this.removeFromFavoritesUrl + favorite_id
      console.log(url);

      this.http.post<any>(url, {}, { headers: this.headers}).subscribe(
        res => {
          console.log('removed_favorite_ok: ', res);
          if (res.message == 'Ok') {
            resolve(true);
          }
          else {
            resolve(false);
          }
        },
        err => {
          console.error('removed_favorite_error: ', err);
          reject(err);
        }
      );
    });
  }


}
