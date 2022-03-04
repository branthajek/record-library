import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Subject, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Record } from './record/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  public recordData = new Subject<Record[]>();
  public editMode = new Subject<boolean>();
  public recordsEdited = new Subject<boolean>();
  public selectedRecord = new Subject<number>();
  public deleteRecord = new Subject<number>();
  public sortBy = new Subject<string>();
  public searchBy = new Subject<string>();
  public moveRecordDirection = new Subject<string>();
  public newRecord = new Subject<Record>();
  public editedRecord = new Subject<{index: number, editedRecord: Record}>();
  public saveLibrary = new Subject<boolean>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  fetchLibrary() {
    this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<{[key: string]: Record}>(`https://record-library-90ac8-default-rtdb.firebaseio.com/${user.id}-posts.json`);
      }),
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key]});
          }
        }
        return postsArray;
      })
    )
    .subscribe(
      records => {
        this.recordData.next(records);
      }
    );
  }

  addRecord(record: Record) {
    this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.post<{name: string}>(`https://record-library-90ac8-default-rtdb.firebaseio.com/${user.id}-posts.json`, record)
      })
    )
    .subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }

  updateLibrary(updatedRecords: Record[]) {
    this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.put(`https://record-library-90ac8-default-rtdb.firebaseio.com/${user.id}-posts.json`, updatedRecords)
      })
    )
    .subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }

  deleteLibrary() {
    this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.delete(`https://record-library-90ac8-default-rtdb.firebaseio.com/${user.id}-posts.json`)
      })
    )
    .subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }
}
