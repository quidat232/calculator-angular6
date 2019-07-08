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
  arrValueChange: string[] = [];
  arrResultChange: string[] = [];
  valueChange: string[];
  // boolHistory: false;
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter<number>();
  // tslint:disable-next-line:no-output-native
  @Output() click =  new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.arrValueChange = this.arrHistoryValue;
    this.arrResultChange = this.arrHistoryResult;
  }
  getReturnResult($index) {
    console.log($index);
    this.change.emit($index);
  }
}
