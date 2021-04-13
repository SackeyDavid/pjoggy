import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublishingService } from 'src/app/services/publishing/publishing.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-create-event-publish',
  templateUrl: './create-event-publish.component.html',
  styleUrls: ['./create-event-publish.component.scss']
})
export class CreateEventPublishComponent implements OnInit {

  isLoading: boolean;

  eventTitle: string = ''
  eventDate: string = ''

  eventId: string = '';
  eventDescription: string = '';
  eventStartDate: string = '';
  eventEndDate: string = '';
  eventContactEmail: string = '';
  eventContactPhone: string = '';

  eventTickets: any;

  constructor(
    private router: Router, 
    private publishingService: PublishingService,
    private ticketService: TicketsService,
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    var data: any =  sessionStorage.getItem('created_event')
    data = JSON.parse(data)
    this.eventTitle = data.event[0].title;
    this.eventDate = data.event[0].start_date_time;

    this.eventId = data.event[0].id;
    this.eventDescription = data.event[0].description;    
    this.eventStartDate = data.event[0].start_date_time;    
    this.eventEndDate = data.event[0].end_date_time;   
    this.eventContactEmail = data.event[0].contact_email;    
    this.eventContactPhone = data.event[0].contact_phone;
    
    this.getTickets();
  }

  previous() {
    this.router.navigateByUrl('/create_event/ticketing');
  }

  publish(): void {    
      this.isLoading = true;
      // this.router.navigateByUrl('/create_event/more_details');
      this.publishingService.publishEvent(this.eventId).then(
        res => {
          if (res) {
            console.log(res);
            this.isLoading = false;
          }
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  getTickets(): any {
    this.ticketService.getTickets(this.eventId).then(
      tickets => {
        console.log(tickets);

        this.eventTickets = tickets;
        // _.forEach(tickets, (ticket) => {
        //   this.createdTicketList.push(ticket);
        // });
      }
    );
  }

}
