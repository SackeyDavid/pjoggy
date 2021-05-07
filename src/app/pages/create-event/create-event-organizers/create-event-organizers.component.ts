import _ from 'lodash';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizersService } from 'src/app/services/organizers/organizers.service';


@Component({
  selector: 'app-create-event-organizers',
  templateUrl: './create-event-organizers.component.html',
  styleUrls: ['./create-event-organizers.component.scss']
})
export class CreateEventOrganizersComponent implements OnInit {

  eventTitle: string = ''
  eventDate: string = ''

  isLoading: boolean;
  saved: boolean;
  isImageSet: boolean;
  imgSrcList: any[];
  createdImgSrc: string;
  eventId: string;
  isEditMode: boolean;
  isSaving: boolean;
  selectedOrganizerId: string;
  selectedOrganizerIndex: number;
  isLoadingOrganizers: boolean;
  createdOrganizerList: Array<any>;
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private organizerService: OrganizersService
  ) {
    this.isLoading = false;
    this.saved = false;
    this.eventId = '';
    this.isSaving = false;
    this.isEditMode = false;
    this.isLoadingOrganizers = false;
    this.isImageSet = false;
    this.imgSrcList = [];
    this.createdImgSrc = '';
    this.createdOrganizerList = [];
    this.selectedOrganizerIndex = -1;
    this.selectedOrganizerId = '';

    this.getEventDetails();
    this.getExistingOrganizers();
  }

  ngOnInit(): void {
    this.initForm();

    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time
  }

  
  public get f(): any {
    return this.form.controls;
  }
  

  initForm(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      profile_image: [''],
      bio: [''],
      facebook: ['', Validators.pattern(urlRegex)],
      twitter: ['', Validators.pattern(urlRegex)],
      linkedin: ['', Validators.pattern(urlRegex)],
      instagram: ['', Validators.pattern(urlRegex)],
    });
  }

  displayFailedDeleteToast(): void {}

  getEventDetails(): any {
    const rawData = sessionStorage.getItem('created_event');
    const eventData = rawData != null ? JSON.parse(rawData) : {};
    this.eventId = eventData.event[0].id;
    console.log(this.eventId);
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      if (!this.isEditMode) {
        this.isSaving = true;
        this.createOrganizer().then(
          ok => {
            if (ok) {
              this.isSaving = false;
              this.saved = false;
              this.form.reset();
              this.createdImgSrc = '';
              this.isImageSet = false;
            }
            else {
              this.isSaving = false;
              alert('didnt create');
            }
          },
          err => {
            console.log(err);
          }
        );
      }
      else {
        this.editOrganizer(this.selectedOrganizerId, this.selectedOrganizerIndex);
      }
    }
  }

  getFormData(): any {
    const data = {
      event_id: this.eventId,
      name: this.f.name.value,
      profile_image: this.f.profile_image,
      bio: this.f.bio.value,
      facebook: this.f.facebook.value,
      twitter: this.f.twitter.value,
      linkedin: this.f.linkedin.value,
      instagram: this.f.instagram.value,
    };
    return data;
  }
  
  getCreatedOrganizerData(organizerId: string): any {
    const organizer = this.getFormData();
    const data = {
      organizerId: organizerId,
      name: organizer.name,
      bio: organizer.bio,
      profile_image: this.createdImgSrc,
      facebook: organizer.facebook,
      twitter: organizer.twitter,
      linkedin: organizer.linkedin,
      instagram: organizer.instagram,
    };
    console.log(data);
    return data;
  }

  getExistingOrganizers(): any {
    this.isLoadingOrganizers = true;
    this.organizerService.getOrganizers(this.eventId).then(
      organizers => {
        this.isLoadingOrganizers = false;
        _.forEach(organizers, (organizer, i) => {
          this.createdOrganizerList.push(organizer);
          if (!(organizers[i].image == null)){
            this.imgSrcList[i] = 'http://events369.logitall.biz/storage/organizer/' + organizers[i].image;
          }
          else{
            this.imgSrcList[i] = '../../../../assets/images/avatar-placeholder.png';
          }
        });
      }
    );
  }

  async createOrganizer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var organizerData = this.getFormData();
      var image = this.f.profile_image.value;
      this.organizerService.createOrganizer(organizerData, image, this.eventId).then(
        organizerId => {          
            const createdOrganizer = this.getCreatedOrganizerData(organizerId);
            this.createdOrganizerList.unshift(createdOrganizer);
            this.imgSrcList.unshift(this.createdImgSrc)
            
            if (!(this.createdImgSrc == '')){
              this.imgSrcList.unshift(this.createdImgSrc)
            }
            else{
              this.imgSrcList.unshift('../../../../assets/images/avatar-placeholder.png')
            }

            resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  onFileSelected(e: any){
    const file:File = e.target.files[0];
    if (file) {
      this.isImageSet = true;

      this.f.profile_image.value = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.createdImgSrc = e.target.result;
      }
    }
  }
  
  edit(organizer: any, index: number): void {
    this.isEditMode = true;
    this.f.name.setValue(organizer.name);
    this.f.bio.setValue(organizer.bio);
    this.f.facebook.setValue(organizer.facebook);
    this.f.linkedin.setValue(organizer.linkedin);
    this.f.twitter.setValue(organizer.twitter);
    this.f.instagram.setValue(organizer.instagram);
    this.createdImgSrc = this.imgSrcList[index];
    this.isImageSet = true;
    
    this.selectedOrganizerId = organizer.id;
    this.selectedOrganizerIndex = index;
  }

  editOrganizer(organizerId: string, index: number): void {
    this.isSaving = true;
    const organizer = this.getFormData();
    var image = this.f.profile_image.value;
    console.log(organizer);
    this.organizerService.editOrganizer(organizerId, organizer, image).then(
      ok => {
        if (ok) {          
          const editedOrganizer = this.createdOrganizerList[index];
          editedOrganizer.name = organizer.name;
          editedOrganizer.bio = organizer.bio;
          editedOrganizer.facebook = organizer.facebook,
          editedOrganizer.linkedin = organizer.linkedin,
          editedOrganizer.twitter = organizer.twitter,
          editedOrganizer.instagram = organizer.instagram;
          this.imgSrcList[index] = this.createdImgSrc;

          this.isSaving = false;
          this.isEditMode = false;
          this.form.reset();
          this.createdImgSrc = '';
          this.isImageSet = false;
        }
      },
      err => {}
    );
  }

  delete(id: string, index: number): void {
    this.deleteOrganizer(id, index);
    console.log('why aint u working?');
  }

  deleteOrganizer(organizerId: string, index: number): void {
    this.organizerService.deleteOrganizer(organizerId).then(
      res => {
        console.log(res);
        res ? this.createdOrganizerList.splice(index, 1) : this.displayFailedDeleteToast();
      },
      err => {
        console.log(err);
      }
    );
  }
  
  previous(): void {
    this.router.navigateByUrl('/edit_event/basic_info');
  }

  save(): void {
    this.router.navigateByUrl('/create_advanced/speakers');
  }
  
}
