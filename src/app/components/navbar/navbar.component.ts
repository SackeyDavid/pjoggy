import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  // logIn() {
  //   this.router
  // }

  // signUp() {

  // }

}
