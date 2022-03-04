import { Component, Input, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';
import { Record } from './record.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() index!: number;
  @Input() record!: Record;
  @Input() lastItem!: number;
  @Input() customMode!: boolean;

  constructor(public recordsService: RecordsService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    // this.recordsService.deleteRecord(this.index);
    this.recordsService.deleteRecord.next(this.index);
  }

  onEdit() {
    this.recordsService.editMode.next(true);
    this.recordsService.selectedRecord.next(this.index);
    // this.recordsService.selectedRecordId.next(this.record.id);
  }

  moveUp() {
    this.recordsService.selectedRecord.next(this.index);
    this.recordsService.moveRecordDirection.next('up');
  }
  moveDown() {
    this.recordsService.selectedRecord.next(this.index);
    this.recordsService.moveRecordDirection.next('down');
  }
}
