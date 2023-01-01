import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  currentPage = 1;
  page?: number;
  @Input() totalItems!:number;
  @Output() pagingChanged: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.totalItems);
  }
  pageChanged(event: PageChangedEvent): void {
    this.pagingChanged.emit(event);
  }
}
