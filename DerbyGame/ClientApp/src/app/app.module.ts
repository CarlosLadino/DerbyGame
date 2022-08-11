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
import { SelectGuestDialog } from './home/selectGuest.dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestComponent } from './common/CustomComponents/guest.component';
import { GuestSelectionComponent } from './common/CustomComponents/guestSelection.component';
import { PlaceComponent } from './common/CustomComponents/place.component';
import { HorseNumberComponent } from './common/CustomComponents/horseNumber.component';

import { RaceGuestComponent } from './common/CustomComponents/raceGuest.component';
import { GuestTotalComponent } from './common/CustomComponents/guesTotal.component';
import { RaceProgressComponent } from './common/CustomComponents/raceProgress.component';
import { RaceProgressChipListComponent } from './common/CustomComponents/raceProgressChipList.component';
import { RaceWithdrawnHorseDialog } from './admin/races/raceWithdrawnHorse.dialog';
import { RaceProgressDialog } from './admin/races/raceProgress.dialog';
import { RaceViewerDialog } from './admin/races/raceViewer.dialog';
import { PreRaceRosterComponent } from './common/CustomComponents/preRaceRoster.component';

//Filters
import { CallbackPipe } from './common/filters';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { GuestEditDialog } from './admin/guests/guestEdit.dialog';
import { EventRaceSelectDialog } from './admin/events/eventRaceSelect.dialog';
import { UtilityService } from './common/Services/utility.service';
import { DeactivateGuardService } from './common/Services/deactivateGuardService';
import { ShowWinnersDialog } from './home/showWinners.dialog';
import { AddRaceToEventDialog} from './home/addRaceToEvent.dialog';
import { from } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    SelectGuestDialog,
    ShowWinnersDialog,
    AddRaceToEventDialog,
    GuestComponent,
    GuestSelectionComponent,
    PlaceComponent,
    HorseNumberComponent,
    RaceGuestComponent,
    GuestTotalComponent,
    RaceProgressComponent,
    RaceProgressChipListComponent,
    PreRaceRosterComponent,
    RaceWithdrawnHorseDialog,
    RaceViewerDialog,
    RaceProgressDialog,
    CallbackPipe
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
      MatStepperModule,
      NgbModule
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
      SelectGuestDialog,
      ShowWinnersDialog,
      AddRaceToEventDialog,
      RaceWithdrawnHorseDialog,
      RaceViewerDialog,
      RaceProgressDialog
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
