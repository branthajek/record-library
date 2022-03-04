import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Record } from '../library/record/record.model';
import { RecordsService } from '../library/records.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [
    trigger('message', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            opacity: 1,
            offset: 0
          }),
          style({
            opacity: 0.7,
            offset: 0.3
          }),
          style({
            opacity: 0.5,
            offset: 0.6
          }),
          style({
            opacity: 0.3,
            offset: 0.8
          }),
          style({
            opacity: 0,
            offset: 1
          }),
        ]))
      ])
    ])
  ]
})
export class InputComponent implements OnInit {
  @ViewChild('formRef', {static: true}) inputForm!: NgForm;

  messageDisplay = true;
  submitted = false;
  moreInfo = false;
  moreInfoText = "If your library is shared, you may add the owner for each record. Otherwise, leave blank.";
  isCompiliationDefault = 'N';
  
  public record: Record = {
    title: '',
    isCompilation: '',
    artist: '',
    year: '',
    genre: '',
    owner: '',
    image: '',
  };

  constructor(public recordsService: RecordsService) {
  }

  ngOnInit(): void {
    
  }

  togglePopover() {
    this.moreInfo = !this.moreInfo;
  }

  setArtist() {
    if (this.inputForm.value.isCompilation == 'Y') {
      this.inputForm.value.artist = 'Compilation';
    } else {
      this.inputForm.value.isCompilation == '';
    }
  }
  setImage() {
    if (!this.inputForm.value.image) {
      this.inputForm.value.image = 'https://static.vecteezy.com/system/resources/previews/001/206/675/non_2x/rock-music-icon-vinyl-record-png.png';
    }
  }

  setCompilation() {
    this.inputForm.form.patchValue({
      isCompilation: 'N'
    });
  }

  onSubmit() {
    this.submitted = true;
    this.setArtist();
    this.setImage();
    
    this.record = new Record(
      this.inputForm.value.title,
      this.inputForm.value.isCompilation,
      this.inputForm.value.artist,
      this.inputForm.value.year,
      this.inputForm.value.genre,
      this.inputForm.value.owner,
      this.inputForm.value.image,
    );

    this.recordsService.newRecord.next(this.record);

    this.inputForm.reset();
    this.messageDisplay = true;
    this.successMessageDisplay();
    this.setCompilation();
  }

  successMessageDisplay() {
    setTimeout(() => {
      this.messageDisplay = false;
    }, 1000)
  }
}
