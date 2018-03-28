var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { customElement, inlineView } from "aurelia-templating";
let AuGridsterPlaceholder = class AuGridsterPlaceholder {
    constructor(element) {
        this._element = element;
    }
    created() {
        let mainEl = this._element.closest('au-gridster');
        if (mainEl && mainEl.au['au-gridster'].viewModel) {
            this._auGridster = mainEl.au['au-gridster'].viewModel;
        }
    }
    attached() {
        this._element.classList.add('grid-placeholder');
        if (this._auGridster.autoStyle)
            this._element.style.position = 'absolute';
        this._element.style.display = 'none';
    }
    setSize(newSize) {
        this._size = newSize;
        this._recalculateDimensions();
    }
    setGridPosition(newPosition) {
        this._position = newPosition;
        this._recalculatePosition();
    }
    setCascadeMode(cascade) {
        this._cascadeMode = cascade;
        let styleObj = {
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
    }
    show() {
        this._element.style.display = 'block';
    }
    hide() {
        this._element.style.display = 'none';
    }
    //	Private methods
    _setDimensions(w, h) {
        this._element.style.width = w + 'px';
        this._element.style.height = h + 'px';
    }
    _setPosition(x, y) {
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
    }
    _recalculatePosition() {
        const x = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._position.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
        const y = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._position.row - 1) + this._auGridster.marginTop;
        this._setPosition(x, y);
    }
    _recalculateDimensions() {
        const w = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
        const h = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));
        this._setDimensions(w, h);
    }
};
AuGridsterPlaceholder = __decorate([
    inlineView('<template><div></div></template>'),
    customElement('au-gridster-placeholder'),
    inject(Element)
], AuGridsterPlaceholder);
export { AuGridsterPlaceholder };
