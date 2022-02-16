import { Component} from '@angular/core';
import { EventService } from '../../common/Services/event.service';
import { VwEventGuestTotals } from '../../common/Models/eventRace.model';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'eventTotals.component.html'
})

export class EventTotalsComponent {
    public totals: Array<VwEventGuestTotals>;
    private eventId: number;
    constructor(private eventeService: EventService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => {
            this.eventId = Number(params.get('id'));
        });
        this.eventeService.getTotalsById(this.eventId).subscribe((data: Array<VwEventGuestTotals>) => {
            this.totals = data;
        });
    }
}
