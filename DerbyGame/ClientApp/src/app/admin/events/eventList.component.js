"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListComponent = void 0;
var core_1 = require("@angular/core");
var eventEdit_dialog_1 = require("./eventEdit.dialog");
var confirm_dialog_1 = require("../../common/CustomComponents/ConfirmationDialog/confirm.dialog");
var confirmDialog_model_1 = require("../../common/CustomComponents/ConfirmationDialog/confirmDialog.model");
var eventRaceSelect_dialog_1 = require("./eventRaceSelect.dialog");
var EventListComponent = /** @class */ (function () {
    function EventListComponent(eventService, dialog) {
        var _this = this;
        this.eventService = eventService;
        this.dialog = dialog;
        this.displayedColumns = ['name', 'eventDate', 'actions', 'races', 'active', 'totals'];
        this.eventService.getEvents().subscribe(function (data) {
            _this.datasource = data;
        });
    }
    EventListComponent.prototype.ngOnInit = function () {
    };
    EventListComponent.prototype.onDeleteClick = function (id) {
        var _this = this;
        var message = "Are you sure you want to delete this Event?";
        var dialogData = new confirmDialog_model_1.ConfirmDialogModel("Confirm Delete", message);
        var dialogRef = this.dialog.open(confirm_dialog_1.ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (dialogResult) {
            if (dialogResult == true) {
                _this.eventService.delete(id).subscribe(function () {
                    _this.loadData();
                });
            }
        });
    };
    EventListComponent.prototype.onEditClick = function (id) {
        this.openDialog(id);
    };
    EventListComponent.prototype.onRacesClick = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(eventRaceSelect_dialog_1.EventRaceSelectDialog, {
            width: '500px',
            data: { id: id },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadData();
        });
    };
    EventListComponent.prototype.openDialog = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(eventEdit_dialog_1.EventEditDialog, {
            width: '350px',
            data: { id: id },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadData();
        });
    };
    EventListComponent.prototype.loadData = function () {
        var _this = this;
        this.eventService.getEvents().subscribe(function (data) {
            _this.datasource = data;
        });
    };
    EventListComponent.prototype.onActivateClick = function (id, active) {
        var _this = this;
        this.eventService.setActive(id, active).subscribe(function () {
            _this.loadData();
        });
    };
    EventListComponent = __decorate([
        core_1.Component({
            templateUrl: 'eventList.component.html'
        })
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=eventList.component.js.map