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
exports.ConfirmDialog = void 0;
var dialog_1 = require("@angular/material/dialog");
var core_1 = require("@angular/core");
var ConfirmDialog = /** @class */ (function () {
    function ConfirmDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }
    ConfirmDialog.prototype.ngOnInit = function () {
    };
    ConfirmDialog.prototype.onConfirm = function () {
        // Close the dialog, return true
        this.dialogRef.close(true);
    };
    ConfirmDialog.prototype.onDismiss = function () {
        // Close the dialog, return false
        this.dialogRef.close(false);
    };
    ConfirmDialog = __decorate([
        core_1.Component({
            selector: 'confirmDialog',
            templateUrl: './confirm.dialog.html',
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ConfirmDialog);
    return ConfirmDialog;
}());
exports.ConfirmDialog = ConfirmDialog;
//# sourceMappingURL=confirm.dialog.js.map