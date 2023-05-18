import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component {
  @Input() drawer: any;
  @Input() user: any;
  @Input() user2: any;
}
