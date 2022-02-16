"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEditDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var EventEditDialog = /** @class */ (function () {
    function EventEditDialog(eventService, dialogRef, data) {
        this.eventService = eventService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    EventEditDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.event = this.data;
        this.dialogTitle = this.data.id > 0 ? 'Edit Event' : 'Enter New Event';
        this.eventService.getEvent(this.data.id).subscribe(function (result) {
            _this.event = result;
        });
    };
    EventEditDialog.prototype.ngAfterViewInit = function () {
    };
    EventEditDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    EventEditDialog.prototype.onSaveClick = function () {
        var _this = this;
        this.eventService.save(this.event).subscribe(function () {
            _this.dialogRef.close();
        });
    };
    EventEditDialog = __decorate([
        core_1.Component({
            selector: 'eventEditDialog',
            templateUrl: 'eventEdit.dialog.html',
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], EventEditDialog);
    return EventEditDialog;
}());
exports.EventEditDialog = EventEditDialog;
//# sourceMappingURL=eventEdit.dialog.js.map