// import { Component } from '@angular/core';

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: [ './app.component.css' ]
// })
// export class AppComponent  {
//   name = 'Angular';
// }
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Seat {
  seatId: number;
  row: number;
  isBooked: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('seatAnimation', [
      state('available', style({
        transform: 'scale(1)',
        backgroundColor: '#2ecc71'
      })),
      state('booked', style({
        transform: 'scale(1.1)',
        backgroundColor: '#e74c3c'
      })),
      transition('available => booked', [
        animate('300ms ease-in')
      ]),
      transition('booked => available', [
        animate('300ms ease-out')
      ])
    ]),
    trigger('resultAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  lastRowSeats: number = 3;
  seats: Seat[] = [];
  rows: number[] = [];
  bookingResult: number[] = [];
  seatCount: number = 1; // Bound to input

  ngOnInit() {
    this.initializeSeats();
  }

  initializeSeats() {
    const totalRows = Math.ceil(this.totalSeats / this.seatsPerRow);
    for (let i = 1; i <= this.totalSeats; i++) {
      let row = i <= this.lastRowSeats ? totalRows : Math.ceil(i / this.seatsPerRow);
      this.seats.push({ seatId: i, row: row, isBooked: false });
    }
    this.rows = Array.from(new Set(this.seats.map(seat => seat.row)));
  }

  bookSeats(count: number) {
    if (count < 1 || count > 7) {
      alert('You can book between 1 and 7 seats at a time.');
      return;
    }

    this.bookingResult = [];
    let availableSeats = this.findConsecutiveSeats(count);
    if (availableSeats.length === count) {
      availableSeats.forEach(seat => seat.isBooked = true);
      this.bookingResult = availableSeats.map(seat => seat.seatId);
    } else {
      availableSeats = this.findClosestSeats(count);
      if (availableSeats.length === count) {
        availableSeats.forEach(seat => seat.isBooked = true);
        this.bookingResult = availableSeats.map(seat => seat.seatId);
      } else {
        alert('Not enough seats available.');
      }
    }
  }

  findConsecutiveSeats(count: number): Seat[] {
    for (let row of this.rows) {
      let rowSeats = this.seats.filter(seat => seat.row === row && !seat.isBooked);
      for (let i = 0; i <= rowSeats.length - count; i++) {
        let segment = rowSeats.slice(i, i + count);
        if (segment.length === count) {
          return segment;
        }
      }
    }
    return [];
  }

  findClosestSeats(count: number): Seat[] {
    return this.seats.filter(seat => !seat.isBooked).slice(0, count);
  }

  getSeatClass(seat: Seat): string {
    return seat.isBooked ? 'booked' : 'available';
  }

  getSeatsForRow(row: number): Seat[] {
    return this.seats.filter(seat => seat.row === row);
  }
}

