import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-print-history',
  templateUrl: './print-history.component.html',
  styleUrls: ['./print-history.component.css']
})
export class PrintHistoryComponent implements OnChanges, OnInit {
  @Input() result;
  @Input() arrHistoryValue;
  @Input() arrHistoryResult;
  @Output() returnIndex;
  arrValueChange: any[] = [];
  arrResultChange: any[] = [];
  strObj;
  valueChange: string[];
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.arrValueChange = this.arrHistoryValue;
    this.arrResultChange = this.arrHistoryResult;
    console.log(this.arrValueChange);
    console.log(this.arrResultChange);
  }

}
