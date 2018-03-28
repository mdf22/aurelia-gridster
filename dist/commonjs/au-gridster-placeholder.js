"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_templating_1 = require("aurelia-templating");
var AuGridsterPlaceholder = /** @class */ (function () {
    function AuGridsterPlaceholder(element) {
        this._element = element;
    }
    AuGridsterPlaceholder.prototype.created = function () {
        var mainEl = this._element.closest('au-gridster');
        if (mainEl && mainEl.au['au-gridster'].viewModel) {
            this._auGridster = mainEl.au['au-gridster'].viewModel;
        }
    };
    AuGridsterPlaceholder.prototype.attached = function () {
        this._element.classList.add('grid-placeholder');
        if (this._auGridster.autoStyle)
            this._element.style.position = 'absolute';
        this._element.style.display = 'none';
    };
    AuGridsterPlaceholder.prototype.setSize = function (newSize) {
        this._size = newSize;
        this._recalculateDimensions();
    };
    AuGridsterPlaceholder.prototype.setGridPosition = function (newPosition) {
        this._position = newPosition;
        this._recalculatePosition();
    };
    AuGridsterPlaceholder.prototype.setCascadeMode = function (cascade) {
        this._cascadeMode = cascade;
        var styleObj = {
            left: '',
            top: '',
            right: '',
            bottom: ''
        };
        switch (cascade) {
            case 'up':
            case 'left':
            default:
                styleObj.left = '0px';
                styleObj.top = '0px';
                styleObj.right = null;
                styleObj.bottom = null;
                break;
            case 'right':
                styleObj.right = '0px';
                styleObj.top = '0px';
                styleObj.left = null;
                styleObj.bottom = null;
                break;
            case 'down':
                styleObj.left = '0px';
                styleObj.bottom = '0px';
                styleObj.right = null;
                styleObj.top = null;
                break;
        }
        Object.assign(this._element.style, styleObj);
    };
    AuGridsterPlaceholder.prototype.show = function () {
        this._element.style.display = 'block';
    };
    AuGridsterPlaceholder.prototype.hide = function () {
        this._element.style.display = 'none';
    };
    //	Private methods
    AuGridsterPlaceholder.prototype._setDimensions = function (w, h) {
        this._element.style.width = w + 'px';
        this._element.style.height = h + 'px';
    };
    AuGridsterPlaceholder.prototype._setPosition = function (x, y) {
        switch (this._cascadeMode) {
            case 'up':
            case 'left':
            default:
                this._element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                break;
            case 'right':
                this._element.style.transform = 'translate(' + -x + 'px, ' + y + 'px)';
                break;
            case 'down':
                this._element.style.transform = 'translate(' + x + 'px, ' + -y + 'px)';
                break;
        }
    };
    AuGridsterPlaceholder.prototype._recalculatePosition = function () {
        var x = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._position.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
        var y = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._position.row - 1) + this._auGridster.marginTop;
        this._setPosition(x, y);
    };
    AuGridsterPlaceholder.prototype._recalculateDimensions = function () {
        var w = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
        var h = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));
        this._setDimensions(w, h);
    };
    AuGridsterPlaceholder = __decorate([
        aurelia_templating_1.inlineView('<template><div></div></template>'),
        aurelia_templating_1.customElement('au-gridster-placeholder'),
        aurelia_dependency_injection_1.inject(Element)
    ], AuGridsterPlaceholder);
    return AuGridsterPlaceholder;
}());
exports.AuGridsterPlaceholder = AuGridsterPlaceholder;
