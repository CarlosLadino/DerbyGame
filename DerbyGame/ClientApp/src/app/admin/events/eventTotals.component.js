"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTotalsComponent = void 0;
var core_1 = require("@angular/core");
var EventTotalsComponent = /** @class */ (function () {
    function EventTotalsComponent(eventeService, route) {
        var _this = this;
        this.eventeService = eventeService;
        this.route = route;
        this.route.paramMap.subscribe(function (params) {
            _this.eventId = Number(params.get('id'));
        });
        this.eventeService.getTotalsById(this.eventId).subscribe(function (data) {
            _this.totals = data;
        });
    }
    EventTotalsComponent = __decorate([
        core_1.Component({
            templateUrl: 'eventTotals.component.html'
        })
    ], EventTotalsComponent);
    return EventTotalsComponent;
}());
exports.EventTotalsComponent = EventTotalsComponent;
//# sourceMappingURL=eventTotals.component.js.map