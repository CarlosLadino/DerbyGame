"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestSelectionComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var selectGuest_dialog_1 = require("../../home/selectGuest.dialog");
var GuestSelectionComponent = /** @class */ (function () {
    function GuestSelectionComponent(dialog) {
        this.dialog = dialog;
        this.selectedGuestIdChange = new core_1.EventEmitter();
        this.size = "small";
        this.imageSize = '';
        this.fontSize = '';
    }
    GuestSelectionComponent.prototype.ngOnInit = function () {
        if (!this.avatarFileName) {
            this.avatarFileName = 'person.png';
        }
        else {
            this.avatarFileName = this.avatarFileName;
        }
        if (this.size == "small") {
            this.imageSize = "30px";
            this.fontSize = "11px";
        }
        else {
            this.imageSize = "70px";
            this.fontSize = "35px";
        }
    };
    GuestSelectionComponent.prototype.onSelectGuest = function () {
        var _this = this;
        var dialogRef = this.dialog.open(selectGuest_dialog_1.SelectGuestDialog, {
            width: '450px'
        });
        dialogRef.afterClosed().subscribe(function (dialogResult) {
            var id = 0;
            var avatarName = 'person.png';
            var name = '';
            if (dialogResult != undefined) {
                id = dialogResult.id;
                if (dialogResult.avatarName !== null) {
                    avatarName = dialogResult.avatarName;
                }
                name = dialogResult.name;
            }
            _this.selectedGuestId = id;
            _this.avatarFileName = avatarName;
            _this.guestName = name;
            _this.selectedGuestIdChange.emit(_this.selectedGuestId);
        });
    };
    __decorate([
        core_2.Input()
    ], GuestSelectionComponent.prototype, "selectedGuestId", void 0);
    __decorate([
        core_1.Output()
    ], GuestSelectionComponent.prototype, "selectedGuestIdChange", void 0);
    __decorate([
        core_2.Input()
    ], GuestSelectionComponent.prototype, "size", void 0);
    GuestSelectionComponent = __decorate([
        core_2.Component({
            selector: 'guest-selection-component',
            templateUrl: './guestSelection.component.html',
        })
    ], GuestSelectionComponent);
    return GuestSelectionComponent;
}());
exports.GuestSelectionComponent = GuestSelectionComponent;
//# sourceMappingURL=guestSelection.component.js.map