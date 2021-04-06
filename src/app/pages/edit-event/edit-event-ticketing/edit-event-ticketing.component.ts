import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-edit-event-ticketing',
  templateUrl: './edit-event-ticketing.component.html',
  styleUrls: ['./edit-event-ticketing.component.scss']
})
export class EditEventTicketingComponent implements OnInit {

  isLoading: boolean;
  saved: boolean;
  isEditMode: boolean;
  isSaving: boolean;
  selectedTicketId: string;
  selectedTicketIndex: number;
  isLoadingTickets: boolean;
  createdTicketList: Array<any>;
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ticketService: TicketsService
  ) {
    this.isLoading = false;
    this.saved = false;
    this.isSaving = false;
    this.isEditMode = false;
    this.isLoadingTickets = false;
    this.createdTicketList = [];
    this.selectedTicketIndex = -1;
    this.selectedTicketId = '';

    this.getExistingTickets();
  }

  ngOnInit(): void {
    this.initForm();
  }

  
  public get f(): any {
    return this.form.controls;
  }
  

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [''],
      price: ['0'],
      currency: ['GHS'],
      salesEndDate: ['2020-03-29 15:12:00'],
      salesStartDate: ['2020-03-28 15:12:00']
    });
  }

  displayFailedDeleteToast(): void {}

  previous(): void {
    this.router.navigateByUrl('/create_event/more_details');
  }

  save(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/create_event/publishing');
    }, 3500);
  }

  create(): void {
    this.saved = true;
    if (this.form.valid) {
      console.log('form is valid');
      if (!this.isEditMode) {
        this.isSaving = true;
        this.createTicket().then(
          ok => {
            if (ok) {
              this.isSaving = false;
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
        this.editTicket(this.selectedTicketId, this.selectedTicketIndex);
      }
    }
  }

  getFormData(): any {
    const data = {
      name: this.f.name.value,
      quantity: this.f.quantity.value,
      price: this.f.price.value,
      salesEndDate: this.f.salesEndDate.value,
      salesStartDate: this.f.salesStartDate.value,
      currency: this.f.currency.value,
      eventId: 18
    };
    return data;
  }

  getCreatedTicketData(ticketId: string): any {
    const ticket = this.getFormData();
    const data = {
      ticketId: ticketId,
      name: ticket.name,
      quantity: ticket.quantity,
      price: ticket.price,
      salesEndDate: ticket.salesEndDate,
      salesStartDate: ticket.salesStartDate,
      currency: ticket.currency
    };
    return data;
  }

  getExistingTickets(): any {
    this.isLoadingTickets = true;
    this.ticketService.getTickets('18').then(
      tickets => {
        this.isLoadingTickets = false;
        _.forEach(tickets, (ticket) => {
          this.createdTicketList.push(ticket);
        });
      }
    );
  }

  async createTicket(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ticketData = this.getFormData();
      this.ticketService.createTicket(ticketData).then(
        ticketId => {
          if (ticketId == 0) {
            resolve(false);
          }
          else {
            const createdTicket = this.getCreatedTicketData(ticketId);
            this.createdTicketList.push(createdTicket);
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

  edit(ticket: any, index: number): void {
    this.isEditMode = true;
    this.f.name.setValue(ticket.name);
    this.f.price.setValue(ticket.price);
    this.f.currency.setValue(ticket.currency);
    this.f.quantity.setValue(ticket.max_quantity);
    this.f.salesEndDate.setValue(ticket.sales_enddate_time);
    this.f.salesStartDate.setValue(ticket.sales_startdate_time);

    this.selectedTicketId = ticket.id;
    this.selectedTicketIndex = index;
  }

  editTicket(ticketId: string, index: number): void {
    this.isSaving = true;
    const ticket = this.getFormData();
    this.ticketService.editTicket(ticketId, ticket).then(
      ok => {
        if (ok) {
          this.isSaving = false;
          this.isEditMode = false;
          const editedTicket = this.createdTicketList[index];
          editedTicket.name = ticket.name;
          editedTicket.max_quantity = ticket.quantity;
          editedTicket.price = ticket.price,
          editedTicket.sales_enddate_time = ticket.salesEndDate,
          editedTicket.sales_startdate_time = ticket.salesStartDate,
          editedTicket.currency = ticket.currency;
        }
      },
      err => {}
    );
  }

  delete(id: string, index: number): void {
    this.deleteTicket(id, index);
  }

  deleteTicket(ticketId: string, index: number): void {
    this.createdTicketList.splice(index, 1);
    // this.ticketService.deleteTicket(ticketId).then(
    //   ok => {
    //     ok
    //       ? this.createdTicketList.splice(index, 1)
    //       : this.displayFailedDeleteToast();
    //   },
    //   err => {}
    // );
  }

}
