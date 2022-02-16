"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
var core_1 = require("@angular/core");
var EventService = /** @class */ (function () {
    function EventService(httpClient) {
        this.httpClient = httpClient;
        this.apiController = 'api/Events/';
    }
    EventService.prototype.getEvents = function () {
        return this.httpClient.get(this.apiController + "GetEvents");
    };
    EventService.prototype.getActive = function () {
        return this.httpClient.get(this.apiController + "GetActive");
    };
    EventService.prototype.getEvent = function (id) {
        return this.httpClient.get(this.apiController + "GetEvent/" + id);
    };
    EventService.prototype.save = function (record) {
        return this.httpClient.post(this.apiController + "Save", record);
    };
    EventService.prototype.delete = function (id) {
        return this.httpClient.delete(this.apiController + "Delete/" + id);
    };
    EventService.prototype.setActive = function (id, active) {
        return this.httpClient.post(this.apiController + "SetActive", { id: id, active: active, name: 'temp', eventDate: new Date() });
    };
    EventService.prototype.getTotalsById = function (id) {
        return this.httpClient.get(this.apiController + "GetTotalsById/" + id);
    };
    EventService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map