// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'hello',
//   template: `<h1>Hello {{name}}!</h1>`,
//   styles: [`h1 { font-family: Lato; }`]
// })
// export class HelloComponent  {
//   @Input() name: string;
// }
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hello',
  template: `<h2 [@headerAnimation]>Welcome to the Train Seat Booking System</h2>`,
  animations: [
    trigger('headerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HelloComponent {}
