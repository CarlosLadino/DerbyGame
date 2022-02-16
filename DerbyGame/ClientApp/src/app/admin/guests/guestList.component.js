"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var guestEdit_dialog_1 = require("./guestEdit.dialog");
var confirm_dialog_1 = require("../../common/CustomComponents/ConfirmationDialog/confirm.dialog");
var confirmDialog_model_1 = require("../../common/CustomComponents/ConfirmationDialog/confirmDialog.model");
var GuestListComponent = /** @class */ (function () {
    function GuestListComponent(guestService, dialog) {
        var _this = this;
        this.guestService = guestService;
        this.dialog = dialog;
        this.datasource = new table_1.MatTableDataSource();
        this.displayedColumns = ['avatar', 'name', 'isActive', 'actions'];
        this.guestService.getGuests().subscribe(function (data) {
            _this.datasource = new table_1.MatTableDataSource(data);
        });
    }
    GuestListComponent.prototype.ngOnInit = function () {
    };
    GuestListComponent.prototype.onDeleteClick = function (id) {
        var _this = this;
        var message = "Are you sure you want to delete this Guest?";
        var dialogData = new confirmDialog_model_1.ConfirmDialogModel("Confirm Delete", message);
        var dialogRef = this.dialog.open(confirm_dialog_1.ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(function (dialogResult) {
            if (dialogResult == true) {
                _this.guestService.delete(id).subscribe(function () {
                    _this.loadData();
                });
            }
        });
    };
    GuestListComponent.prototype.onEditClick = function (id) {
        this.openDialog(id);
    };
    GuestListComponent.prototype.openDialog = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(guestEdit_dialog_1.GuestEditDialog, {
            width: '350px',
            data: { id: id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadData();
        });
    };
    GuestListComponent.prototype.loadData = function () {
        var _this = this;
        this.guestService.getGuests().subscribe(function (data) {
            _this.datasource = new table_1.MatTableDataSource(data);
        });
    };
    GuestListComponent.prototype.onIsActiveClick = function (id, isActiveValue) {
        var _this = this;
        this.guestService.setIsActive(id, isActiveValue).subscribe(function () {
            _this.loadData();
            _this.filter = '';
        });
    };
    GuestListComponent.prototype.onResetAllClick = function () {
        var _this = this;
        var message = "Are you sure you want to reset all Guest to inactive?";
        var dialogData = new confirmDialog_model_1.ConfirmDialogModel("Confirm Reset", message);
        var dialogRef = this.dialog.open(confirm_dialog_1.ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(function (dialogResult) {
            if (dialogResult == true) {
                _this.guestService.resetIsActiveAll().subscribe(function () {
                    _this.loadData();
                    _this.filter = '';
                });
            }
        });
    };
    GuestListComponent.prototype.applyFilter = function (filterValue) {
        this.datasource.filter = filterValue.trim().toLowerCase();
    };
    GuestListComponent = __decorate([
        core_1.Component({
            templateUrl: 'guestList.component.html'
        })
    ], GuestListComponent);
    return GuestListComponent;
}());
exports.GuestListComponent = GuestListComponent;
//# sourceMappingURL=guestList.component.js.map