"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceInstance = void 0;
var RaceInstance = /** @class */ (function () {
    function RaceInstance() {
        this.eventRaceId = 0;
        this.betAmount = 2;
        this.allowSecondGuest = false;
        this.totalCollected = 0;
        this.firstPlaceAmount = 0;
        this.secondPlaceAmount = 0;
        this.thirdPlaceAmount = 0;
        this.numberOfHorses = 0;
        this.raceUrl = "";
        this.raceId = 0;
        this.raceVideoName = "";
        this.saved = false;
        this.winners = [];
        this.raceWasLoadedFromDB = false;
    }
    Object.defineProperty(RaceInstance.prototype, "AlloGuessSelection", {
        get: function () {
            return this.eventRaceId > 0
                && this.betAmount > 0
                && this.saved == false;
        },
        enumerable: false,
        configurable: true
    });
    return RaceInstance;
}());
exports.RaceInstance = RaceInstance;
//# sourceMappingURL=raceInstance.model.js.map