"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestComponent = void 0;
var core_1 = require("@angular/core");
var GuestComponent = /** @class */ (function () {
    function GuestComponent() {
        this.size = "small";
        this.imageSize = '';
        this.fontSize = '';
    }
    GuestComponent.prototype.ngOnInit = function () {
        if (!this.avatarName) {
            this.avatarFileName = 'person.png';
        }
        else {
            this.avatarFileName = this.avatarName;
        }
        if (this.size == "small") {
            this.imageSize = "30px";
            this.fontSize = "11px";
        }
        else {
            this.imageSize = "90px";
            this.fontSize = "40px";
        }
    };
    __decorate([
        core_1.Input()
    ], GuestComponent.prototype, "avatarName", void 0);
    __decorate([
        core_1.Input()
    ], GuestComponent.prototype, "guestName", void 0);
    __decorate([
        core_1.Input()
    ], GuestComponent.prototype, "size", void 0);
    GuestComponent = __decorate([
        core_1.Component({
            selector: 'guest-component',
            templateUrl: './guest.component.html',
        })
    ], GuestComponent);
    return GuestComponent;
}());
exports.GuestComponent = GuestComponent;
//# sourceMappingURL=guest.component.js.map