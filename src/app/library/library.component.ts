import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Record } from './record/record.model';
import { RecordsService } from './records.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  library: Record[] = [];
  editMode = false;
  searchBy = '';
  customMode = false;
  selectedIndex: number = 0;
  selectedRecord!: Record;
  lastItem!: number;
  isAuthenticated = false;

  recordDataSubscription!: Subscription;
  editModeSubscription!: Subscription;
  selectedRecordSubscription!: Subscription;
  deleteRecordSubscription!: Subscription;
  sortBySubscription!: Subscription;
  searchBySubscription!: Subscription;
  moveRecordSubscription!: Subscription;
  newRecordSubscription!: Subscription;
  editedRecordSubscription!: Subscription;
  saveLibrarySubscription!: Subscription;

  private userSubscription!: Subscription;

  constructor(public recordsService: RecordsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user.token;
      }
    );

    this.recordsService.fetchLibrary();
    
    this.recordDataSubscription = this.recordsService.recordData.subscribe(
      recordData => {
        this.library = recordData;
        this.lastItem = this.library.length - 1;
      }
    )

    this.editModeSubscription = this.recordsService.editMode.subscribe(
      (editMode: boolean) => {
        this.editMode = editMode;
      }
    )

    this.selectedRecordSubscription = this.recordsService.selectedRecord.subscribe(
      (index: number) => {
        this.selectedIndex = index;
        this.selectedRecord = this.library[index];
      }
    )

    this.searchBySubscription = this.recordsService.searchBy.subscribe(
      (searchBy: string) => {
        this.searchBy = searchBy;
      }
    )

    this.newRecordSubscription = this.recordsService.newRecord.subscribe(
      (newRecord: Record) => {
        this.library.push(newRecord);
        this.recordsService.addRecord(newRecord);
      }
    );

    this.deleteRecordSubscription = this.recordsService.deleteRecord.subscribe(
      (index: number) => {
        if (this.library.length === 1) {
          this.library = [];
          this.recordsService.deleteLibrary();
        } else {
          this.library.splice(index, 1);
          const updatedLibrary = this.library;
          this.recordsService.updateLibrary(updatedLibrary);
        } 
      }
    );

    this.editedRecordSubscription = this.recordsService.editedRecord.subscribe(
      (recordData) => {
        const libraryCopy = this.library;
        libraryCopy.splice(recordData.index, 1, recordData.editedRecord);
        this.recordsService.updateLibrary(libraryCopy);
      }
    );

    this.sortBySubscription = this.recordsService.sortBy.subscribe(
      (sortBy: string) => {

        if (sortBy === 'Custom') {
          this.customMode = true;
        } else {
          this.customMode = false;
        }

        switch (sortBy) {
          case 'Album':
            this.library.sort((a: Record, b: Record) => a.title.localeCompare(b.title))
            break;
          case 'Artist':
              this.library.sort((a: Record, b: Record) => a.artist.localeCompare(b.artist))
              break;  
          case 'Year':
              this.library.sort((a: Record, b: Record) => a.year?.localeCompare(b.year))
              break;  
          case 'Genre':
            this.library.sort((a: Record, b: Record) => a.genre?.localeCompare(b.genre))
            break;   
          case 'Owner':
            this.library.sort((a: Record, b: Record) => a.owner?.localeCompare(b.owner))
            break;
          default:
            this.recordsService.fetchLibrary();
        }
        // this.recordsService.updateLibrary(this.library);
      }
    )

    this.moveRecordSubscription = this.recordsService.moveRecordDirection.subscribe(
      (direction: string) => {
        let moveDirection = direction;

        switch (moveDirection) {
          case 'up':
            [this.library[this.selectedIndex], this.library[this.selectedIndex - 1]] = [this.library[this.selectedIndex - 1], this.library[this.selectedIndex]];
            break;
          case 'down':
            [this.library[this.selectedIndex], this.library[this.selectedIndex + 1]] = [this.library[this.selectedIndex + 1], this.library[this.selectedIndex]];
            break; 
          default:
            this.recordsService.fetchLibrary();
        }
        // this.recordsService.updateLibrary(this.library);
      }
    )

    this.saveLibrarySubscription = this.recordsService.saveLibrary.subscribe(
      (saveLibrary) => {
        if (saveLibrary) {
          this.onUpdateLibrary();
        }
      }
    )
  }

  onUpdateLibrary() {
    this.recordsService.updateLibrary(this.library);
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
    this.selectedRecordSubscription.unsubscribe();
    this.deleteRecordSubscription.unsubscribe();
    this.sortBySubscription.unsubscribe();
    this.searchBySubscription.unsubscribe();
    this.moveRecordSubscription.unsubscribe();
    this.newRecordSubscription.unsubscribe();
    this.editedRecordSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.saveLibrarySubscription.unsubscribe();
  }

}
