"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreRaceRosterComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var eventRaceGuest_model_1 = require("../Models/eventRaceGuest.model");
var PreRaceRosterComponent = /** @class */ (function () {
    function PreRaceRosterComponent() {
        this.done = new core_1.EventEmitter();
        this.horse = new eventRaceGuest_model_1.VwEventRaceGuests(0, 0);
    }
    PreRaceRosterComponent.prototype.ngOnInit = function () {
    };
    PreRaceRosterComponent.prototype.onStartDisplay = function () {
        var _this = this;
        this.showRosterTimer = rxjs_1.timer(0, 2000).subscribe(function (n) {
            if (n == _this.raceInstance.eventRaceGuests.length) {
                _this.showRosterTimer.unsubscribe();
                _this.done.emit();
            }
            else {
                _this.horse = _this.raceInstance.eventRaceGuests[n];
            }
        });
    };
    __decorate([
        core_1.Input()
    ], PreRaceRosterComponent.prototype, "raceInstance", void 0);
    __decorate([
        core_1.Output()
    ], PreRaceRosterComponent.prototype, "done", void 0);
    PreRaceRosterComponent = __decorate([
        core_1.Component({
            selector: 'pre-race-roster-component',
            templateUrl: './preRaceRoster.component.html',
        })
    ], PreRaceRosterComponent);
    return PreRaceRosterComponent;
}());
exports.PreRaceRosterComponent = PreRaceRosterComponent;
//# sourceMappingURL=preRaceRoster.component.js.map