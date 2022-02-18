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
exports.RaceEditDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var raceWithdrawnHorse_dialog_1 = require("./raceWithdrawnHorse.dialog");
var RaceEditDialog = /** @class */ (function () {
    function RaceEditDialog(raceService, raceResultService, dialogRef, dialog, data) {
        this.raceService = raceService;
        this.raceResultService = raceResultService;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
    }
    RaceEditDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.race = this.data;
        this.dialogTitle = this.data.id > 0 ? 'Edit Race' : 'Enter New Race';
        this.raceService.getRace(this.data.id).subscribe(function (result) {
            _this.race = result;
        });
        this.raceResultService.getRaceResults(this.data.id).subscribe(function (result) {
            _this.places = result;
        });
    };
    RaceEditDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    RaceEditDialog.prototype.onSaveClick = function () {
        var _this = this;
        var isNew = this.race.id == 0;
        this.raceService.save(this.race).subscribe(function (result) {
            _this.places.forEach(function (place) {
                if (isNew) {
                    place.raceId = result.id;
                }
                _this.raceResultService.save(place).subscribe(function () {
                    _this.dialogRef.close();
                });
            });
        });
    };
    RaceEditDialog.prototype.onWithdrawnHorsesClick = function () {
        this.openDialog();
    };
    RaceEditDialog.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(raceWithdrawnHorse_dialog_1.RaceWithdrawnHorseDialog, {
            width: '600px',
            data: { id: this.race.id, numberOfHorses: this.race.numberOfHorses },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            /*this.loadData();*/
        });
    };
    RaceEditDialog = __decorate([
        core_1.Component({
            selector: 'raceEditDialog',
            templateUrl: 'raceEdit.dialog.html',
        }),
        __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], RaceEditDialog);
    return RaceEditDialog;
}());
exports.RaceEditDialog = RaceEditDialog;
//# sourceMappingURL=raceEdit.dialog.js.map