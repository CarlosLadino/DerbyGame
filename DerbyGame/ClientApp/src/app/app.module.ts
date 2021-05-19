import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { EventListComponent } from './admin/events/eventList.component';
import { EventTotalsComponent } from './admin/events/eventTotals.component';
import { RaceListComponent } from './admin/races/raceList.component';
import { GuestListComponent } from './admin/guests/guestList.component';
import { EventEditDialog } from './admin/events/eventEdit.dialog'; 
import { ConfirmDialog } from './common/CustomComponents/ConfirmationDialog/confirm.dialog';
import { RaceEditDialog } from './admin/races/raceEdit.dialog';
import { SelectHorseDialog } from './home/selectHorse.dialog';
import { ActivateGuestsDialog } from './home/activateGuests.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestComponent } from './common/CustomComponents/guest.component';
import { RaceGuestComponent } from './common/CustomComponents/raceGuest.component';
import { GuestTotalComponent } from './common/CustomComponents/guesTotal.component';
import { RaceWithdrawnHorseDialog } from './admin/races/raceWithdrawnHorse.dialog';
import { RaceViewerDialog } from './admin/races/raceViewer.dialog';
import {
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatStepperModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { GuestEditDialog } from './admin/guests/guestEdit.dialog';
import { EventRaceSelectDialog } from './admin/events/eventRaceSelect.dialog';
import { UtilityService } from './common/Services/utility.service';
import { DeactivateGuardService } from './common/Services/deactivateGuardService';
import { ShowWinnersDialog } from './home/showWinners.dialog';
import { AddRaceToEventDialog} from './home/addRaceToEvent.dialog';
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EventListComponent,
    EventTotalsComponent,
    RaceListComponent,
    GuestListComponent,
    EventEditDialog,
    GuestEditDialog,
    ConfirmDialog,
    RaceEditDialog,
    EventRaceSelectDialog,
    SelectHorseDialog,
    ActivateGuestsDialog,
    ShowWinnersDialog,
    AddRaceToEventDialog,
    GuestComponent,
    RaceGuestComponent,
    GuestTotalComponent,
    RaceWithdrawnHorseDialog,
    RaceViewerDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    RouterModule.forRoot([
        { path: '', canDeactivate: [DeactivateGuardService], component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'eventList', component: EventListComponent },
        { path: 'raceList', component: RaceListComponent },
        { path: 'guestList', component: GuestListComponent },
        { path: 'eventTotals/:id', component: EventTotalsComponent },
    ]),
      BrowserAnimationsModule,
      MatButtonModule,
      MatTableModule,
      MatMenuModule,
      MatIconModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTooltipModule,
      MatCheckboxModule,
      MatSelectModule,
      MatListModule,
      MatSidenavModule,
      MatGridListModule,
      MatCardModule,
      MatChipsModule,
      MatExpansionModule,
      MatBadgeModule,
      MatStepperModule
  ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: (appUtility: UtilityService) => () => appUtility.loadInitialValues(), deps: [UtilityService], multi: true },
        DeactivateGuardService
    ],
    entryComponents: [
      EventEditDialog,
      GuestEditDialog,
      ConfirmDialog,
      RaceEditDialog,
      EventRaceSelectDialog,
      SelectHorseDialog,
      ActivateGuestsDialog,
      ShowWinnersDialog,
      AddRaceToEventDialog,
      RaceWithdrawnHorseDialog,
      RaceViewerDialog
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
