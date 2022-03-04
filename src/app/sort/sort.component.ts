import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecordsService } from '../library/records.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @ViewChild('formRef', {static: true}) sortForm!: NgForm;
  sorted = false;

  options = [
    '',
    'Album',
    'Artist',
    'Year',
    'Genre',
    'Owner',
    'Custom'
  ]

  constructor(public recordsService: RecordsService) { }

  ngOnInit(): void {
  }

  onSaveLibrary() {
    this.recordsService.saveLibrary.next(true);
    this.sortForm.setValue({
      sortBy: ''
    })
    this.sorted = false;
  }

  onSelect(sortBy: string) {
    this.sorted = true;
    this.recordsService.sortBy.next(sortBy);
  };
}
