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
exports.ActivateGuestsDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var list_1 = require("@angular/material/list");
var ActivateGuestsDialog = /** @class */ (function () {
    function ActivateGuestsDialog(guestService, dialogRef, data) {
        this.guestService = guestService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.selectedGuests = new forms_1.FormControl();
    }
    ActivateGuestsDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.dialogTitle = 'Active Guests';
        this.guestService.getNotActiveGuests().subscribe(function (guests) {
            _this.guests = guests;
        });
    };
    ActivateGuestsDialog.prototype.ngAfterViewInit = function () {
    };
    ActivateGuestsDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    ActivateGuestsDialog.prototype.onSaveClick = function () {
        var _this = this;
        var numberOfGuests = this.selectionList.selectedOptions.selected.length;
        if (numberOfGuests > 0) {
            this.selectionList.selectedOptions.selected.forEach(function (item) {
                _this.guestService.setIsActive(item.value, true).subscribe(function () {
                    numberOfGuests--;
                    if (numberOfGuests == 0) {
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
    ], ActivateGuestsDialog.prototype, "selectionList", void 0);
    ActivateGuestsDialog = __decorate([
        core_1.Component({
            selector: 'activateGuestsDialog',
            templateUrl: 'activateGuests.dialog.html',
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ActivateGuestsDialog);
    return ActivateGuestsDialog;
}());
exports.ActivateGuestsDialog = ActivateGuestsDialog;
//# sourceMappingURL=activateGuests.dialog.js.map