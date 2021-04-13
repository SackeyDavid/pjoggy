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
    this.form = this.formBuilder.group({
      organizer: ['', Validators.required],
      bio: [''],
      facebook: [''],
      twitter: [''],
      linkedin: [''],
      instagram: [''],
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
            }
            else {
              this.isSaving = false;
              alert('didnt create');
            }
          },
          err => {}
        );
      }
      else {
        this.editOrganizer(this.selectedOrganizerId, this.selectedOrganizerIndex);
      }
    }
  }

  getFormData(): any {
    const data = {
      organizer: this.f.organizer.value,
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
      organizer: organizer.organizer,
      bio: organizer.bio,
      facebook: organizer.facebook,
      twitter: organizer.twitter,
      linkedin: organizer.linkedin,
      instagram: organizer.instagram,
    };
    return data;
  }

  getExistingOrganizers(): any {
    this.isLoadingOrganizers = true;
    this.organizerService.getOrganizers(this.eventId).then(
      organizers => {
        this.isLoadingOrganizers = false;
        _.forEach(organizers, (organizer) => {
          this.createdOrganizerList.push(organizer);
        });
      }
    );
  }

  async createOrganizer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const organizerData = this.getFormData();
      this.organizerService.createOrganizer(organizerData).then(
        organizerId => {
          if (organizerId == 0) {
            resolve(false);
          }
          else { 
            const createdOrganizer = this.getCreatedOrganizerData(organizerId);
            this.createdOrganizerList.unshift(createdOrganizer);
            resolve(true);
          }
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  edit(organizer: any, index: number): void {
    this.isEditMode = true;
    this.f.organizer.setValue(organizer.organizer);
    this.f.bio.setValue(organizer.bio);
    this.f.facebook.setValue(organizer.facebook);
    this.f.linkedin.setValue(organizer.linkedin);
    this.f.twitter.setValue(organizer.twitter);
    this.f.instagram.setValue(organizer.instagram);

    this.selectedOrganizerId = organizer.id;
    this.selectedOrganizerIndex = index;
  }

  editOrganizer(organizerId: string, index: number): void {
    this.isSaving = true;
    const organizer = this.getFormData();
    this.organizerService.editOrganizer(organizerId, organizer).then(
      ok => {
        if (ok) {
          this.isSaving = false;
          this.isEditMode = false;
          const editedOrganizer = this.createdOrganizerList[index];
          editedOrganizer.name = organizer.name;
          editedOrganizer.max_quantity = organizer.quantity;
          editedOrganizer.price = organizer.price,
          editedOrganizer.sales_enddate_time = organizer.salesEndDate,
          editedOrganizer.sales_startdate_time = organizer.salesStartDate,
          editedOrganizer.currency = organizer.currency;
        }
      },
      err => {}
    );
  }

  delete(id: string, index: number): void {
    this.deleteOrganizer(id, index);
  }

  deleteOrganizer(organizerId: string, index: number): void {
    this.organizerService.deleteOrganizer(organizerId).then(
      ok => {
        ok
          ? this.createdOrganizerList.splice(index, 1)
          : this.displayFailedDeleteToast();
      },
      err => {}
    );
  }
  
}
