"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
var core_1 = require("@angular/core");
var guest_model_1 = require("../Models/guest.model");
var UtilityService = /** @class */ (function () {
    function UtilityService(httpClient, eventService) {
        this.httpClient = httpClient;
        this.eventService = eventService;
    }
    UtilityService.prototype.loadInitialValues = function () {
        var _this = this;
        this.eventService.getActive().subscribe(function (data) {
            _this.activeEvent = data;
        });
    };
    Object.defineProperty(UtilityService.prototype, "ActiveEvent", {
        get: function () {
            return this.activeEvent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UtilityService.prototype, "WithdrawnGuest", {
        get: function () {
            return new guest_model_1.Guest(7003, "Scratched", true, "Scratched.png", true, true);
        },
        enumerable: false,
        configurable: true
    });
    UtilityService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], UtilityService);
    return UtilityService;
}());
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.service.js.map