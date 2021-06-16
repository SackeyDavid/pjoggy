import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { EndpointService } from 'src/app/services/endpoints/endpoint.service';
import { Router } from '@angular/router';
import _ from 'lodash';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userAuthenticated: boolean = false;  
  searchQuery: string = '';
  imgSrc: string = '';
  currentUser: any;

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private endpoint: EndpointService,
    private userAccountsService: UserAccountService
    ) { }

  ngOnInit(): void {
    this.checkIfUserAuthenticated();
    this.getUser();

    let sessionQuery = sessionStorage.getItem('search_query');
    sessionQuery ? this.searchQuery = sessionQuery : this.searchQuery = '';
  }

  showSearchBar() {
    var brand_element = document.getElementById('brand-name')
    var toggle_elemtent = document.getElementById('toggle-button')
    var searchIcon = document.getElementById('searchIcon')

    if(brand_element) {
      brand_element.style.transition = '2s'
      brand_element.style.transitionProperty = 'display'
      brand_element.style.display = 'none'
    }
    if(toggle_elemtent) {
      toggle_elemtent.style.transition = '2s'
      toggle_elemtent.style.transitionProperty = 'display'
      toggle_elemtent.style.display = 'none'
    }
    if(searchIcon) {
      searchIcon.style.transition = '2s'
      searchIcon.style.transitionProperty = 'display'
      searchIcon.style.display = 'none'
    }

    var divsToHide = document.getElementsByClassName("search-on-mobile-only"); //divsToHide is an array
    console.log(divsToHide)
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].setAttribute('style', 'display: block !important') // or
        divsToHide[i].setAttribute('style', 'display: block !important') // depending on what you're doing
    }

  }

  hideMobileSearch() {
    var divsToHide = document.getElementsByClassName("search-on-mobile-only"); //divsToHide is an array
    console.log(divsToHide)
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].setAttribute('style', 'display: none !important') // or
        divsToHide[i].setAttribute('style', 'display: none !important') // depending on what you're doing
    }

    var brand_element = document.getElementById('brand-name')
    var toggle_elemtent = document.getElementById('toggle-button')
    var searchIcon = document.getElementById('searchIcon')

    if(brand_element) {
      brand_element.style.transition = '2s'
      brand_element.style.transitionProperty = 'display'
      brand_element.style.display = 'block'
    }
    if(toggle_elemtent) {
      toggle_elemtent.style.transition = '2s'
      toggle_elemtent.style.transitionProperty = 'display'
      toggle_elemtent.style.display = 'block'
    }
    if(searchIcon) {
      searchIcon.style.transition = '2s'
      searchIcon.style.transitionProperty = 'display'
      searchIcon.style.display = 'block'
    }

  }

  checkIfUserAuthenticated() {
    var data: any =  sessionStorage.getItem('x_auth_token')

    this.userAuthenticated = ((data != null)? true : false)
    console.log('user authenticated: ', this.userAuthenticated)
  }

  // logIn() {
  //   this.router
  // }

  // signUp() {

  // }

  logout(e: any){
    e.preventDefault();
    const apiUrl = 'http://events369.logitall.biz/api/v1/';
    this.http.get<any>(apiUrl + 'logout', { headers: this.endpoint.headers() }).subscribe(
      res =>  {
        console.log(res);
        if (_.toLower(res.message) == 'ok') {
          sessionStorage.removeItem('x_auth_token');

          // this.router.navigateByUrl('/');
          window.location.href = '/'
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  doSearch(){
    console.log('lets search for ' + this.searchQuery);
    sessionStorage.setItem('search_query', this.searchQuery);
    this.searchEvent.emit(this.searchQuery);
    this.router.navigateByUrl('/search_results');
  }

  getUser(): void {
    this.userAccountsService.getCurrentUser().then(
      res => {
        console.log(res);
        this.currentUser = res;

        if (res.profile) {
          this.imgSrc =  res.profile
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
