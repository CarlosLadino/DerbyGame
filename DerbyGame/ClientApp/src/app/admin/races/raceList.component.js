"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceListComponent = void 0;
var core_1 = require("@angular/core");
var raceEdit_dialog_1 = require("./raceEdit.dialog");
var confirm_dialog_1 = require("../../common/CustomComponents/ConfirmationDialog/confirm.dialog");
var confirmDialog_model_1 = require("../../common/CustomComponents/ConfirmationDialog/confirmDialog.model");
var raceViewer_dialog_1 = require("./raceViewer.dialog");
var raceProgress_dialog_1 = require("./raceProgress.dialog");
var RaceListComponent = /** @class */ (function () {
    function RaceListComponent(raceService, dialog) {
        var _this = this;
        this.raceService = raceService;
        this.dialog = dialog;
        this.datasource = [];
        this.displayedColumns = ['name', 'numberOfHorses', 'raceProgressNumber', 'actions', 'videoViewer'];
        this.raceService.getRaces().subscribe(function (data) {
            _this.datasource = data;
        });
    }
    RaceListComponent.prototype.ngOnInit = function () {
    };
    RaceListComponent.prototype.onDeleteClick = function (id) {
        var _this = this;
        var message = "Are you sure you want to delete this Race?";
        var dialogData = new confirmDialog_model_1.ConfirmDialogModel("Confirm Delete", message);
        var dialogRef = this.dialog.open(confirm_dialog_1.ConfirmDialog, {
            maxWidth: "400px",
            data: dialogData,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (dialogResult) {
            if (dialogResult == true) {
                _this.raceService.delete(id).subscribe(function () {
                    _this.loadData();
                });
            }
        });
    };
    RaceListComponent.prototype.onEditClick = function (id) {
        this.openDialog(id);
    };
    RaceListComponent.prototype.onProgressClick = function (id, numberOfHorses, name) {
        this.openProgressDialog(id, numberOfHorses, name);
    };
    RaceListComponent.prototype.onRacesClick = function (id) {
        alert("Select races");
    };
    RaceListComponent.prototype.openDialog = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(raceEdit_dialog_1.RaceEditDialog, {
            width: '600px',
            data: { id: id },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadData();
        });
    };
    RaceListComponent.prototype.openProgressDialog = function (id, numberOfHorses, name) {
        var dialogRef = this.dialog.open(raceProgress_dialog_1.RaceProgressDialog, {
            width: '600px',
            data: { id: id, numberOfHorses: numberOfHorses, name: name },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            /* this.loadData();*/
        });
    };
    RaceListComponent.prototype.onViewClick = function (videoName) {
        var dialogRef = this.dialog.open(raceViewer_dialog_1.RaceViewerDialog, {
            width: '1024px',
            data: { videoName: videoName },
            disableClose: true
        });
    };
    RaceListComponent.prototype.loadData = function () {
        var _this = this;
        this.raceService.getRaces().subscribe(function (data) {
            _this.datasource = data;
        });
    };
    RaceListComponent = __decorate([
        core_1.Component({
            templateUrl: 'raceList.component.html'
        })
    ], RaceListComponent);
    return RaceListComponent;
}());
exports.RaceListComponent = RaceListComponent;
//# sourceMappingURL=raceList.component.js.map