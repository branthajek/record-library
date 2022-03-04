import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { SortComponent } from './sort/sort.component';
import { LibraryComponent } from './library/library.component';
import { RecordComponent } from './library/record/record.component';
import { FormsModule } from '@angular/forms';
import { EditRecordComponent } from './library/edit-record/edit-record.component';
import { FilterPipe } from './library/filter.pipe';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PopoverComponent } from './shared/popover/popover.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputComponent,
    SortComponent,
    LibraryComponent,
    RecordComponent,
    EditRecordComponent,
    FilterPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
