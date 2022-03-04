import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Record } from '../record/record.model';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss']
})
export class EditRecordComponent implements OnInit {
  @ViewChild('editFormRef', {static: true}) editForm!: NgForm;
  @Input() selectedIndex!: number;

  @Input() selectedRecord!: Record;

  submitted = false;
  editMode!: boolean;
  
  public editedRecord: Record = {
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
    setTimeout(() => {
      this.editForm.setValue({
        editTitle: this.selectedRecord.title,
        editIsCompilation: this.selectedRecord.isCompilation,
        editArtist: this.selectedRecord.artist,
        editYear: this.selectedRecord.year,
        editGenre: this.selectedRecord.genre,
        editOwner: this.selectedRecord.owner,
        editImage: this.selectedRecord.image
      });
    }, 100);

  }

  setArtist() {
    if (this.editForm.value.editIsCompilation == 'Y') {
      this.editForm.value.editArtist = 'Compilation';
    }
  }

  onSubmit() {
    this.submitted = true;
    this.setArtist();
    
    this.editedRecord = new Record(
      this.editForm.value.editTitle,
      this.editForm.value.editIsCompilation,
      this.editForm.value.editArtist,
      this.editForm.value.editYear,
      this.editForm.value.editGenre,
      this.editForm.value.editOwner,
      this.editForm.value.editImage,
    );

    this.recordsService.editedRecord.next({
      index: this.selectedIndex,
      editedRecord: this.editedRecord
    });

    // this.recordsService.editRecord(this.selectedIndex, this.editedRecord)

    this.editForm.reset();
    this.onClose();
  }

  onClose() {
    this.recordsService.editMode.next(false);
  }
}
