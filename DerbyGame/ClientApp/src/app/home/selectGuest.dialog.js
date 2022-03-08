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
exports.SelectGuestDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var SelectGuestDialog = /** @class */ (function () {
    function SelectGuestDialog(raceInstanceService, dialogRef, data) {
        this.raceInstanceService = raceInstanceService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.guests = new table_1.MatTableDataSource();
        this.selectedGuests = new forms_1.FormControl();
        this.displayedColumns = ['avatar', 'name'];
    }
    SelectGuestDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.dialogTitle = 'Select a Guest';
        this.raceInstanceService.getActiveGuests().subscribe(function (result) {
            _this.guests = new table_1.MatTableDataSource(result);
        });
    };
    SelectGuestDialog.prototype.ngAfterViewInit = function () {
    };
    SelectGuestDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    SelectGuestDialog.prototype.onSelectedtGuest = function (row) {
        this.dialogRef.close(row);
    };
    SelectGuestDialog.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.guests.filter = filterValue.trim().toLowerCase();
    };
    SelectGuestDialog = __decorate([
        core_1.Component({
            selector: 'selectGuestDialog',
            templateUrl: 'selectGuest.dialog.html',
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SelectGuestDialog);
    return SelectGuestDialog;
}());
exports.SelectGuestDialog = SelectGuestDialog;
//# sourceMappingURL=selectGuest.dialog.js.map