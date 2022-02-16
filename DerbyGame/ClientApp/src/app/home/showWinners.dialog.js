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
exports.winnerRow = exports.ShowWinnersDialog = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ShowWinnersDialog = /** @class */ (function () {
    function ShowWinnersDialog(guestService, dialogRef, data) {
        this.guestService = guestService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.winnerData = [];
    }
    ShowWinnersDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.dialogTitle = 'Race Winners';
        this.data.winners.forEach(function (winner) {
            var guestRow = new winnerRow(_this.data.eventRaceId, winner.assignedHorseNumber);
            guestRow.guestId = winner.guest1Id;
            guestRow.guestName = winner.guest1Name;
            guestRow.placeId = winner.placeId;
            if (winner.guest1Avatar) {
                guestRow.guestAvatar = winner.guest1Avatar;
            }
            switch (winner.placeId) {
                case 1:
                    guestRow.amount = _this.data.allowSecondGuest ? _this.data.firstPlaceAmount / 2 : _this.data.firstPlaceAmount;
                    break;
                case 2:
                    guestRow.amount = _this.data.allowSecondGuest ? _this.data.secondPlaceAmount / 2 : _this.data.secondPlaceAmount;
                    break;
                case 3:
                    guestRow.amount = _this.data.allowSecondGuest ? _this.data.thirdPlaceAmount / 2 : _this.data.thirdPlaceAmount;
                    break;
            }
            _this.winnerData.push(guestRow);
            if (_this.data.allowSecondGuest) {
                var guestRow2 = new winnerRow(_this.data.eventRaceId, winner.assignedHorseNumber);
                guestRow2.guestId = winner.guest2Id;
                guestRow2.guestName = winner.guest2Name;
                guestRow2.placeId = winner.placeId;
                if (winner.guest2Avatar) {
                    guestRow2.guestAvatar = winner.guest2Avatar;
                }
                switch (winner.placeId) {
                    case 1:
                        guestRow2.amount = _this.data.firstPlaceAmount / 2;
                        break;
                    case 2:
                        guestRow2.amount = _this.data.secondPlaceAmount / 2;
                        break;
                    case 3:
                        guestRow2.amount = _this.data.thirdPlaceAmount / 2;
                        break;
                }
                _this.winnerData.push(guestRow2);
            }
        });
        this.winnerData.sort(function (a, b) { return (a.placeId > b.placeId) ? 1 : -1; });
    };
    ShowWinnersDialog.prototype.ngAfterViewInit = function () {
    };
    ShowWinnersDialog.prototype.onCancelClick = function () {
        this.dialogRef.close();
    };
    ShowWinnersDialog = __decorate([
        core_1.Component({
            selector: 'showWinnersDialog',
            templateUrl: 'showWinners.dialog.html',
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ShowWinnersDialog);
    return ShowWinnersDialog;
}());
exports.ShowWinnersDialog = ShowWinnersDialog;
var winnerRow = /** @class */ (function () {
    function winnerRow(eventRaceId, assignedHorseNumber) {
        this.eventRaceId = eventRaceId;
        this.guestId = 0;
        this.guestName = "";
        this.guestAvatar = "person.png";
        this.amount = 0;
        this.placeId = 0;
        this.assignedHorseNumber = assignedHorseNumber;
    }
    return winnerRow;
}());
exports.winnerRow = winnerRow;
//# sourceMappingURL=showWinners.dialog.js.map