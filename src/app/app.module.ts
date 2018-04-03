import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, 
  MatInputModule, 
  MatButtonModule, 
  MatToolbarModule, 
  MatProgressSpinnerModule, 
  MatDividerModule, 
  MatGridListModule, 
  MatCardModule,
  MatButtonToggleModule } from '@angular/material';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule, 
    MatProgressSpinnerModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatGridListModule, 
    MatCardModule, 
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule, 
    MatProgressSpinnerModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatGridListModule, 
    MatCardModule, 
    MatButtonToggleModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
