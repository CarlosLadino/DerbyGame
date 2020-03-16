"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventRaceGuests = /** @class */ (function () {
    function EventRaceGuests(eventRaceId, assignedHorseNumber) {
        this.id = 0;
        this.eventRaceId = eventRaceId;
        this.assignedHorseNumber = assignedHorseNumber;
        this.guest1Id = 0;
        this.guest2Id = 0;
        this.placeId = 0;
        this.wonAmount = 0;
    }
    return EventRaceGuests;
}());
exports.EventRaceGuests = EventRaceGuests;
var VwEventRaceGuests = /** @class */ (function () {
    function VwEventRaceGuests(eventRaceId, assignedHorseNumber) {
        this.id = 0;
        this.eventRaceId = eventRaceId;
        this.assignedHorseNumber = assignedHorseNumber;
        this.guest1Id = 0;
        this.guest2Id = 0;
        this.guest1Name = '';
        this.guest2Name = '';
        this.guest1Avatar = 'person';
        this.guest2Avatar = 'person';
        this.placeId = -1;
        this.wonAmount = 0;
    }
    return VwEventRaceGuests;
}());
exports.VwEventRaceGuests = VwEventRaceGuests;
//# sourceMappingURL=eventRaceGuest.model.js.map