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
exports.AddRaceToEventDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var list_1 = require("@angular/material/list");
var AddRaceToEventDialog = /** @class */ (function () {
    function AddRaceToEventDialog(eventRaceService, dialogRef, data) {
        this.eventRaceService = eventRaceService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.selectedRaces = new forms_1.FormControl();
    }
    AddRaceToEventDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.dialogTitle = 'Add Race to Event';
        this.eventRaceService.getNonSelecteRacesByEventId(this.data.id).subscribe(function (result) {
            _this.races = result;
        });
    };
    AddRaceToEventDialog.prototype.ngAfterViewInit = function () {
    };
    AddRaceToEventDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    AddRaceToEventDialog.prototype.onSaveClick = function () {
        var _this = this;
        var numberOfraces = this.selectionList.selectedOptions.selected.length;
        if (numberOfraces > 0) {
            this.selectionList.selectedOptions.selected.forEach(function (item) {
                _this.eventRaceService.setActive(_this.data.id, item.value).subscribe(function () {
                    numberOfraces--;
                    if (numberOfraces == 0) {
                        _this.dialogRef.close();
                    }
                });
            });
        }
        else {
            this.dialogRef.close();
        }
    };
    __decorate([
        core_1.ViewChild(list_1.MatSelectionList, { static: false })
    ], AddRaceToEventDialog.prototype, "selectionList", void 0);
    AddRaceToEventDialog = __decorate([
        core_1.Component({
            selector: 'addRaceToEventDialog',
            templateUrl: 'addRaceToEvent.dialog.html',
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddRaceToEventDialog);
    return AddRaceToEventDialog;
}());
exports.AddRaceToEventDialog = AddRaceToEventDialog;
//# sourceMappingURL=addRaceToEvent.dialog.js.map