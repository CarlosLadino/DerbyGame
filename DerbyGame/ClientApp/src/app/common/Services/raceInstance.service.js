"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceInstanceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var RaceInstanceService = /** @class */ (function () {
    function RaceInstanceService(httpClient, guestService) {
        this.httpClient = httpClient;
        this.guestService = guestService;
        this.activeGuests = [];
    }
    RaceInstanceService.prototype.getActiveGuests = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = true; }
        var subject = new rxjs_1.Subject();
        if (reload) {
            this.guestService.getActiveGuests().subscribe(function (result) {
                _this.activeGuests = result;
                subject.next(_this.activeGuests);
            });
        }
        else {
            subject.next(this.activeGuests);
        }
        return subject;
    };
    RaceInstanceService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], RaceInstanceService);
    return RaceInstanceService;
}());
exports.RaceInstanceService = RaceInstanceService;
//# sourceMappingURL=raceInstance.service.js.map