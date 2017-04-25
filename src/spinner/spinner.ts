import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.html',
  styleUrls:  ['./spinner.css']
})
export class Spinner {
  @Input()
  public loading: boolean = false;

}
